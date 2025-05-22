/**
 * Testes unitários e de integração para o modelo e API de Comunidade
 */

const request = require('supertest');
const app = require('../server');
const { Comunidade, sequelize } = require('../src/models');

// Limpa e sincroniza o banco antes de cada teste
beforeEach(async () => {
  await sequelize.sync({ force: true });
});

// Encerra a conexão com o banco após todos os testes
afterAll(async () => {
  await sequelize.close();
});

describe('Validações do Modelo de Comunidade', () => {
  it('Deve criar uma comunidade com dados válidos', async () => {
    const novaComunidade = await Comunidade.create({
      nome: 'Comunidade Teste',
      localizacao: 'São Paulo, SP',
      descricao: 'Comunidade criada para testes unitários',
      dataFundacao: '2023-01-01',
      metaSustentabilidade: 'Reduzir emissões em 30%'
    });

    expect(novaComunidade.id).toBeDefined();
    expect(novaComunidade.nome).toBe('Comunidade Teste');
    expect(novaComunidade.localizacao).toBe('São Paulo, SP');
  });

  it('Não deve permitir criação de comunidade sem nome', async () => {
    await expect(Comunidade.create({
      localizacao: 'São Paulo, SP'
    })).rejects.toThrow();
  });
});

describe('Testes da API /api/comunidades', () => {
  it('Deve retornar a lista de comunidades', async () => {
    await Comunidade.create({
      nome: 'Comunidade API',
      localizacao: 'Rio de Janeiro, RJ',
      descricao: 'Comunidade para teste da API',
      dataFundacao: '2023-01-01',
      metaSustentabilidade: 'Reduzir emissões em 30%'
    });

    const response = await request(app).get('/api/comunidades');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].nome).toBe('Comunidade API');
  });

  it('Deve criar uma nova comunidade via API', async () => {
    const dadosComunidade = {
      nome: 'Comunidade Nova',
      localizacao: 'Belo Horizonte, MG',
      descricao: 'Nova comunidade criada via API',
      dataFundacao: '2023-02-01',
      metaSustentabilidade: 'Energia 100% renovável'
    };

    const response = await request(app)
      .post('/api/comunidades')
      .send(dadosComunidade);

    expect(response.status).toBe(201);
    expect(response.body.nome).toBe(dadosComunidade.nome);
    expect(response.body.id).toBeDefined();
  });
});