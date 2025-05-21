/**
 * Controlador para operações relacionadas ao Dashboard
 */

const { Comunidade, Morador, Iniciativa, Metrica, sequelize } = require("../models")
const logger = require("../utils/logger")
const { QueryTypes } = require("sequelize")

/**
 * Obtém métricas consolidadas para o dashboard
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const getMetricasConsolidadas = async (req, res, next) => {
  try {
    // Contagem total de comunidades
    const totalComunidades = await Comunidade.count()

    // Contagem total de moradores
    const totalMoradores = await Morador.count()

    // Contagem total de iniciativas
    const totalIniciativas = await Iniciativa.count()

    // Iniciativas por categoria
    const iniciativasPorCategoria = await Iniciativa.findAll({
      attributes: ["categoria", [sequelize.fn("COUNT", sequelize.col("id")), "total"]],
      group: ["categoria"],
      raw: true,
    })

    // Iniciativas por status
    const iniciativasPorStatus = await Iniciativa.findAll({
      attributes: ["status", [sequelize.fn("COUNT", sequelize.col("id")), "total"]],
      group: ["status"],
      raw: true,
    })

    // Impacto estimado (soma de métricas por tipo)
    const impactoEstimado = await Metrica.findAll({
      attributes: ["tipo", [sequelize.fn("SUM", sequelize.col("valor")), "total"]],
      group: ["tipo"],
      raw: true,
    })

    // Comunidades mais ativas (com mais iniciativas)
    const comunidadesAtivas = await sequelize.query(
      `
      SELECT c.id, c.nome, COUNT(i.id) as total_iniciativas
      FROM comunidades c
      JOIN iniciativas i ON c.id = i.comunidade_id
      GROUP BY c.id, c.nome
      ORDER BY total_iniciativas DESC
      LIMIT 5
    `,
      { type: QueryTypes.SELECT },
    )

    // Formata os dados para o dashboard
    const formatarDados = (dados, chave, valor) => {
      return dados.reduce((acc, item) => {
        acc[item[chave]] = Number.parseInt(item[valor])
        return acc
      }, {})
    }

    const dashboard = {
      totalComunidades,
      totalMoradores,
      totalIniciativas,
      iniciativasPorCategoria: formatarDados(iniciativasPorCategoria, "categoria", "total"),
      iniciativasPorStatus: formatarDados(iniciativasPorStatus, "status", "total"),
      impactoEstimado: formatarDados(impactoEstimado, "tipo", "total"),
      comunidadesAtivas: comunidadesAtivas.map((c) => ({
        id: c.id,
        nome: c.nome,
        totalIniciativas: Number.parseInt(c.total_iniciativas),
      })),
    }

    res.json(dashboard)
  } catch (error) {
    logger.error(`Erro ao gerar métricas do dashboard: ${error.message}`)
    next(error)
  }
}

module.exports = {
  getMetricasConsolidadas,
}
