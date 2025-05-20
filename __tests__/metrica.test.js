/**
 * Testes para o modelo e controlador de Métrica
 */

const request = require('supertest');
const app = require('../server');
const { Metrica, Iniciativa, Comunidade, Morador, sequelize } = require('../src/models');

// Limpa o banco de dados antes de cada teste
beforeEach(async () => {
  await sequelize.sync({ force: true });
});

// Fecha a conexão com o banco de dados após todos os testes
afterAll(async () => {
  await sequelize.close();
});

describe('Modelo de Métrica', () => {
  let iniciativa;

  beforeEach(async () => {
    // Cria uma comunidade, um morador e uma iniciativa para os testes
    const comunidade = await Comunidade.create({
      nome: 'Comunidade Teste',
      localizacao: 'São Paulo, SP'
    });

    const morador = await Morador.create({
      nome: 'João Silva',
      email: 'joao@example.com',
      comunidadeId: comunidade.id
    });

    iniciativa = await Iniciativa.create({
      titulo: 'Horta Comunitária',
      categoria: 'ALIMENTACAO',
      status: 'EM_ANDAMENTO',
      comunidadeId: comunidade.id,
      responsavelId: morador.id
    });
  });

  it('deve criar uma métrica com sucesso', async () => {
    const metrica = await Metrica.create({
      iniciativaId: iniciativa.id,
      tipo: 'producao_alimentos',
      valor: 150.5,
      unidade: 'kg',
      dataRegistro: new Date()
    });

    expect(metrica.id).toBeDefined();
    expect(metrica.tipo).toBe('producao_alimentos');
    expect(metrica.valor).toBe(150.5);
    expect(metrica.unidade).toBe('kg');
    expect(metrica.iniciativaId).toBe(iniciativa.id);
  });

  it('não deve criar uma métrica sem tipo', async () => {
    try {
      await Metrica.create({
        iniciativaId: iniciativa.id,
        valor: 150.5,
        unidade: 'kg'
      });
      // Se chegar aqui, o teste falhou
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('não deve criar uma métrica sem valor', async () => {
    try {
      await Metrica.create({
        iniciativaId: iniciativa.id,
        tipo: 'producao_alimentos',
        unidade: 'kg'
      });
      // Se chegar aqui, o teste falhou
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe('API de Métricas', () => {
  let iniciativa;

  beforeEach(async () => {
    // Cria uma comunidade, um morador e uma iniciativa para os testes
    const comunidade = await Comunidade.create({
      nome: 'Comunidade Teste',
      localizacao: 'São Paulo, SP'
    });

    const morador = await Morador.create({
      nome: 'João Silva',
      email: 'joao@example.com',
      comunidadeId: comunidade.id
    });

    iniciativa = await Iniciativa.create({
      titulo: 'Horta Comunitária',
      categoria: 'ALIMENTACAO',
      status: 'EM_ANDAMENTO',
      comunidadeId: comunidade.id,
      responsavelId: morador.id
    });
  });

  it('deve listar métricas', async () => {
    // Cria uma métrica para o teste
    await Metrica.create({
      iniciativaId: iniciativa.id,
      tipo: 'producao_alimentos',
      valor: 150.5,
      unidade: 'kg',
      dataRegistro: new Date()
    });

    const response = await request(app).get('/api/metricas');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].tipo).toBe('producao_alimentos');
  });

  it('deve criar uma métrica via API', async () => {
    const novaMetrica = {
      iniciativaId: iniciativa.id,
      tipo: 'economia_agua',
      valor: 2500,
      unidade: 'litros',
      dataRegistro: new Date().toISOString()
    };

    const response = await request(app)
      .post('/api/metricas')
      .send(novaMetrica);
    
    expect(response.status).toBe(201);
    expect(response.body.tipo).toBe(novaMetrica.tipo);
    expect(parseFloat(response.body.valor)).toBe(novaMetrica.valor);
    expect(response.body.unidade).toBe(novaMetrica.unidade);
    expect(response.body.id).toBeDefined();
  });
});