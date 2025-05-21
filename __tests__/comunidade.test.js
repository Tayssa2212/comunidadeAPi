/**
 * Testes para o modelo e controlador de Comunidade
 */

const request = require('supertest');
const app = require('../server');
const { Comunidade, sequelize } = require('../src/models');

// Limpa o banco de dados antes de cada teste
beforeEach(async () => {
  await sequelize.sync({ force: true });
});

// Fecha a conexão com o banco de dados após todos os testes
afterAll(async () => {
  await sequelize.close();
});

describe('Modelo de Comunidade', () => {
  it('deve criar uma comunidade com sucesso', async () => {
    const comunidade = await Comunidade.create({
      nome: 'Comunidade Teste',
      localizacao: 'São Paulo, SP',
      descricao: 'Comunidade para testes',
      dataFundacao: '2023-01-01',
      metaSustentabilidade: 'Reduzir emissões em 30%'
    });

    expect(comunidade.id).toBeDefined();
    expect(comunidade.nome).toBe('Comunidade Teste');
    expect(comunidade.localizacao).toBe('São Paulo, SP');
  });

  it('não deve criar uma comunidade sem nome', async () => {
    try {
      await Comunidade.create({
        localizacao: 'São Paulo, SP'
      });
      // Se chegar aqui, o teste falhou
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe('API de Comunidades', () => {
  it('deve listar comunidades', async () => {
    // Cria uma comunidade para o teste
    await Comunidade.create({
      nome: 'Comunidade API',
      localizacao: 'Rio de Janeiro, RJ',
      descricao: 'Comunidade para teste de API',
      dataFundacao: '2023-01-01',
      metaSustentabilidade: 'Reduzir emissões em 30%'
    });

    const response = await request(app).get('/api/comunidades');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].nome).toBe('Comunidade API');
  });

  it('deve criar uma comunidade via API', async () => {
    const novaComunidade = {
      nome: 'Comunidade Nova',
      localizacao: 'Belo Horizonte, MG',
      descricao: 'Nova comunidade via API',
      dataFundacao: '2023-02-01',
      metaSustentabilidade: 'Energia 100% renovável'
    };

    const response = await request(app)
      .post('/api/comunidades')
      .send(novaComunidade);
    
    expect(response.status).toBe(201);
    expect(response.body.nome).toBe(novaComunidade.nome);
    expect(response.body.id).toBeDefined();
  });
});