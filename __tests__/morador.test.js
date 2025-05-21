/**
 * Testes para o controlador de Dashboard
 */

const request = require('supertest');
const app = require('../server');
const { Comunidade, Morador, Iniciativa, Metrica, sequelize } = require('../src/models');

// Limpa o banco de dados antes de cada teste
beforeEach(async () => {
  await sequelize.sync({ force: true });
});

// Fecha a conexão com o banco de dados após todos os testes
afterAll(async () => {
  await sequelize.close();
});

describe('API de Dashboard', () => {
  beforeEach(async () => {
    // Cria dados para os testes
    const comunidade1 = await Comunidade.create({
      nome: 'Comunidade Verde',
      localizacao: 'São Paulo, SP'
    });

    const comunidade2 = await Comunidade.create({
      nome: 'Eco Vila',
      localizacao: 'Rio de Janeiro, RJ'
    });

    const morador1 = await Morador.create({
      nome: 'João Silva',
      email: 'joao@example.com',
      comunidadeId: comunidade1.id
    });

    const morador2 = await Morador.create({
      nome: 'Maria Oliveira',
      email: 'maria@example.com',
      comunidadeId: comunidade2.id
    });

    const iniciativa1 = await Iniciativa.create({
      titulo: 'Horta Comunitária',
      categoria: 'ALIMENTACAO',
      status: 'EM_ANDAMENTO',
      comunidadeId: comunidade1.id,
      responsavelId: morador1.id
    });

    const iniciativa2 = await Iniciativa.create({
      titulo: 'Coleta Seletiva',
      categoria: 'RESIDUOS',
      status: 'PLANEJADA',
      comunidadeId: comunidade1.id,
      responsavelId: morador1.id
    });

    const iniciativa3 = await Iniciativa.create({
      titulo: 'Energia Solar',
      categoria: 'ENERGIA',
      status: 'CONCLUIDA',
      comunidadeId: comunidade2.id,
      responsavelId: morador2.id
    });

    await Metrica.create({
      iniciativaId: iniciativa1.id,
      tipo: 'producao_alimentos',
      valor: 150.5,
      unidade: 'kg'
    });

    await Metrica.create({
      iniciativaId: iniciativa2.id,
      tipo: 'residuos_reciclados',
      valor: 300,
      unidade: 'kg'
    });

    await Metrica.create({
      iniciativaId: iniciativa3.id,
      tipo: 'economia_energia',
      valor: 500,
      unidade: 'kWh'
    });
  });

  it('deve retornar métricas consolidadas para o dashboard', async () => {
    const response = await request(app).get('/api/dashboard/metricas');
    
    expect(response.status).toBe(200);
    expect(response.body.totalComunidades).toBe(2);
    expect(response.body.totalMoradores).toBe(2);
    expect(response.body.totalIniciativas).toBe(3);
    
    // Verifica se as categorias estão corretas
    expect(response.body.iniciativasPorCategoria).toBeDefined();
    expect(response.body.iniciativasPorCategoria.ALIMENTACAO).toBe(1);
    expect(response.body.iniciativasPorCategoria.RESIDUOS).toBe(1);
    expect(response.body.iniciativasPorCategoria.ENERGIA).toBe(1);
    
    // Verifica se os status estão corretos
    expect(response.body.iniciativasPorStatus).toBeDefined();
    expect(response.body.iniciativasPorStatus.EM_ANDAMENTO).toBe(1);
    expect(response.body.iniciativasPorStatus.PLANEJADA).toBe(1);
    expect(response.body.iniciativasPorStatus.CONCLUIDA).toBe(1);
    
    // Verifica se o impacto estimado está correto
    expect(response.body.impactoEstimado).toBeDefined();
    
    // Verifica se as comunidades ativas estão corretas
    expect(response.body.comunidadesAtivas).toBeDefined();
    expect(Array.isArray(response.body.comunidadesAtivas)).toBe(true);
    expect(response.body.comunidadesAtivas.length).toBeGreaterThan(0);
  });
});