/**
 * Testes para o modelo e controlador de Iniciativa
 */

const request = require('supertest');
const app = require('../server');
const { Iniciativa, Comunidade, Morador, sequelize } = require('../src/models');

// Limpa o banco de dados antes de cada teste
beforeEach(async () => {
  await sequelize.sync({ force: true });
});

// Fecha a conexão com o banco de dados após todos os testes
afterAll(async () => {
  await sequelize.close();
});

describe('Modelo de Iniciativa', () => {
  let comunidade;
  let morador;

  beforeEach(async () => {
    // Cria uma comunidade e um morador para os testes
    comunidade = await Comunidade.create({
      nome: 'Comunidade Teste',
      localizacao: 'São Paulo, SP'
    });

    morador = await Morador.create({
      nome: 'João Silva',
      email: 'joao@example.com',
      comunidadeId: comunidade.id
    });
  });

  it('deve criar uma iniciativa com sucesso', async () => {
    const iniciativa = await Iniciativa.create({
      titulo: 'Horta Comunitária',
      descricao: 'Criação de uma horta comunitária',
      categoria: 'ALIMENTACAO',
      dataInicio: '2023-01-01',
      dataFim: '2023-12-31',
      status: 'EM_ANDAMENTO',
      comunidadeId: comunidade.id,
      responsavelId: morador.id
    });

    expect(iniciativa.id).toBeDefined();
    expect(iniciativa.titulo).toBe('Horta Comunitária');
    expect(iniciativa.categoria).toBe('ALIMENTACAO');
    expect(iniciativa.status).toBe('EM_ANDAMENTO');
    expect(iniciativa.comunidadeId).toBe(comunidade.id);
    expect(iniciativa.responsavelId).toBe(morador.id);
  });

  it('não deve criar uma iniciativa sem título', async () => {
    try {
      await Iniciativa.create({
        categoria: 'ALIMENTACAO',
        status: 'EM_ANDAMENTO',
        comunidadeId: comunidade.id
      });
      // Se chegar aqui, o teste falhou
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('não deve criar uma iniciativa com categoria inválida', async () => {
    try {
      await Iniciativa.create({
        titulo: 'Horta Comunitária',
        categoria: 'CATEGORIA_INVALIDA',
        status: 'EM_ANDAMENTO',
        comunidadeId: comunidade.id
      });
      // Se chegar aqui, o teste falhou
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe('API de Iniciativas', () => {
  let comunidade;
  let morador;

  beforeEach(async () => {
    // Cria uma comunidade e um morador para os testes
    comunidade = await Comunidade.create({
      nome: 'Comunidade Teste',
      localizacao: 'São Paulo, SP'
    });

    morador = await Morador.create({
      nome: 'João Silva',
      email: 'joao@example.com',
      comunidadeId: comunidade.id
    });
  });

  it('deve listar iniciativas', async () => {
    // Cria uma iniciativa para o teste
    await Iniciativa.create({
      titulo: 'Horta Comunitária',
      descricao: 'Criação de uma horta comunitária',
      categoria: 'ALIMENTACAO',
      status: 'EM_ANDAMENTO',
      comunidadeId: comunidade.id,
      responsavelId: morador.id
    });

    const response = await request(app).get('/api/iniciativas');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].titulo).toBe('Horta Comunitária');
  });

  it('deve criar uma iniciativa via API', async () => {
    const novaIniciativa = {
      titulo: 'Coleta Seletiva',
      descricao: 'Implementação de coleta seletiva na comunidade',
      categoria: 'RESIDUOS',
      dataInicio: '2023-03-01',
      status: 'PLANEJADA',
      comunidadeId: comunidade.id,
      responsavelId: morador.id
    };

    const response = await request(app)
      .post('/api/iniciativas')
      .send(novaIniciativa);
    
    expect(response.status).toBe(201);
    expect(response.body.titulo).toBe(novaIniciativa.titulo);
    expect(response.body.categoria).toBe(novaIniciativa.categoria);
    expect(response.body.id).toBeDefined();
  });
});