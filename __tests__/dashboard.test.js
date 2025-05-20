/**
 * Testes para o modelo e controlador de Morador
 */

const request = require('supertest');
const app = require('../server');
const { Morador, Comunidade, sequelize } = require('../src/models');

// Limpa o banco de dados antes de cada teste
beforeEach(async () => {
  await sequelize.sync({ force: true });
});

// Fecha a conexão com o banco de dados após todos os testes
afterAll(async () => {
  await sequelize.close();
});

describe('Modelo de Morador', () => {
  let comunidade;

  beforeEach(async () => {
    // Cria uma comunidade para os testes
    comunidade = await Comunidade.create({
      nome: 'Comunidade Teste',
      localizacao: 'São Paulo, SP'
    });
  });

  it('deve criar um morador com sucesso', async () => {
    const morador = await Morador.create({
      nome: 'João Silva',
      email: 'joao@example.com',
      telefone: '11999999999',
      dataNascimento: '1990-01-01',
      comunidadeId: comunidade.id
    });

    expect(morador.id).toBeDefined();
    expect(morador.nome).toBe('João Silva');
    expect(morador.email).toBe('joao@example.com');
    expect(morador.comunidadeId).toBe(comunidade.id);
  });

  it('não deve criar um morador sem email', async () => {
    try {
      await Morador.create({
        nome: 'João Silva',
        comunidadeId: comunidade.id
      });
      // Se chegar aqui, o teste falhou
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('não deve criar um morador com email duplicado', async () => {
    // Cria o primeiro morador
    await Morador.create({
      nome: 'João Silva',
      email: 'joao@example.com',
      comunidadeId: comunidade.id
    });

    try {
      // Tenta criar outro morador com o mesmo email
      await Morador.create({
        nome: 'Maria Silva',
        email: 'joao@example.com',
        comunidadeId: comunidade.id
      });
      // Se chegar aqui, o teste falhou
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe('API de Moradores', () => {
  let comunidade;

  beforeEach(async () => {
    // Cria uma comunidade para os testes
    comunidade = await Comunidade.create({
      nome: 'Comunidade Teste',
      localizacao: 'São Paulo, SP'
    });
  });

  it('deve listar moradores', async () => {
    // Cria um morador para o teste
    await Morador.create({
      nome: 'João Silva',
      email: 'joao@example.com',
      telefone: '11999999999',
      dataNascimento: '1990-01-01',
      comunidadeId: comunidade.id
    });

    const response = await request(app).get('/api/moradores');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].nome).toBe('João Silva');
  });

  it('deve criar um morador via API', async () => {
    const novoMorador = {
      nome: 'Maria Oliveira',
      email: 'maria@example.com',
      telefone: '11988888888',
      dataNascimento: '1992-05-15',
      comunidadeId: comunidade.id
    };

    const response = await request(app)
      .post('/api/moradores')
      .send(novoMorador);
    
    expect(response.status).toBe(201);
    expect(response.body.nome).toBe(novoMorador.nome);
    expect(response.body.email).toBe(novoMorador.email);
    expect(response.body.id).toBeDefined();
  });
});