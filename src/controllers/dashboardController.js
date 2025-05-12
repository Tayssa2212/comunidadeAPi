/**
 * Controlador para operações relacionadas ao Dashboard
 * Fornece métricas e estatísticas consolidadas
 */

const { Comunidade, Morador, Iniciativa, Metrica, sequelize } = require("../models")
const logger = require("../utils/logger")

/**
 * Obtém métricas gerais do sistema
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const getMetricas = async (req, res) => {
  try {
    // Contagem de comunidades
    const totalComunidades = await Comunidade.count()

    // Contagem de moradores
    const totalMoradores = await Morador.count()

    // Contagem de iniciativas
    const totalIniciativas = await Iniciativa.count()

    // Iniciativas por categoria
    const iniciativasPorCategoria = {}
    for (const categoria of Object.values(Iniciativa.CATEGORIAS)) {
      const count = await Iniciativa.count({
        where: { categoria },
      })
      iniciativasPorCategoria[categoria] = count
    }

    // Iniciativas por status
    const iniciativasPorStatus = {}
    for (const status of Object.values(Iniciativa.STATUS)) {
      const count = await Iniciativa.count({
        where: { status },
      })
      iniciativasPorStatus[status] = count
    }

    // Cálculo de impacto estimado com base nas métricas registradas
    const metricasReducaoCO2 =
      (await Metrica.sum("valor", {
        where: { tipo: "reducaoCO2" },
      })) || 0

    const metricasEconomiaAgua =
      (await Metrica.sum("valor", {
        where: { tipo: "economiaAgua" },
      })) || 0

    const metricasResiduosReciclados =
      (await Metrica.sum("valor", {
        where: { tipo: "residuosReciclados" },
      })) || 0

    // Impacto estimado
    const impactoEstimado = {
      reducaoCO2: metricasReducaoCO2,
      economiaAgua: metricasEconomiaAgua,
      residuosReciclados: metricasResiduosReciclados,
    }

    // Comunidades mais ativas (com mais iniciativas)
    const comunidadesAtivas = await Comunidade.findAll({
      attributes: ["id", "nome", [sequelize.fn("COUNT", sequelize.col("iniciativas.id")), "totalIniciativas"]],
      include: [
        {
          model: Iniciativa,
          as: "iniciativas",
          attributes: [],
        },
      ],
      group: ["Comunidade.id"],
      order: [[sequelize.literal("totalIniciativas"), "DESC"]],
      limit: 5,
    })

    res.status(200).json({
      totalComunidades,
      totalMoradores,
      totalIniciativas,
      iniciativasPorCategoria,
      iniciativasPorStatus,
      impactoEstimado,
      comunidadesAtivas,
    })
  } catch (error) {
    logger.error(`Erro ao buscar métricas do dashboard: ${error.message}`)
    res.status(500).json({ error: "Erro ao buscar métricas" })
  }
}

module.exports = {
  getMetricas,
}
