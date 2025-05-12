/**
 * Controlador para operações relacionadas a Métricas
 * Implementa o CRUD completo para o modelo Metrica
 */

const { Metrica, Iniciativa } = require("../models")
const logger = require("../utils/logger")

/**
 * Obtém todas as métricas
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const getAllMetricas = async (req, res) => {
  try {
    const metricas = await Metrica.findAll({
      include: [{ model: Iniciativa, as: "iniciativa" }],
    })
    res.status(200).json(metricas)
  } catch (error) {
    logger.error(`Erro ao buscar métricas: ${error.message}`)
    res.status(500).json({ error: "Erro ao buscar métricas" })
  }
}

/**
 * Obtém uma métrica pelo ID
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const getMetricaById = async (req, res) => {
  try {
    const { id } = req.params

    const metrica = await Metrica.findByPk(id, {
      include: [{ model: Iniciativa, as: "iniciativa" }],
    })

    if (!metrica) {
      return res.status(404).json({ error: "Métrica não encontrada" })
    }

    res.status(200).json(metrica)
  } catch (error) {
    logger.error(`Erro ao buscar métrica ${req.params.id}: ${error.message}`)
    res.status(500).json({ error: "Erro ao buscar métrica" })
  }
}

/**
 * Cria uma nova métrica
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const createMetrica = async (req, res) => {
  try {
    const { iniciativaId, tipo, valor, unidade, dataRegistro } = req.body

    // Validação básica
    if (!iniciativaId || !tipo || valor === undefined || !unidade) {
      return res.status(400).json({
        error: "IniciativaId, tipo, valor e unidade são obrigatórios",
      })
    }

    // Verifica se a iniciativa existe
    const iniciativa = await Iniciativa.findByPk(iniciativaId)
    if (!iniciativa) {
      return res.status(404).json({ error: "Iniciativa não encontrada" })
    }

    const novaMetrica = await Metrica.create({
      iniciativaId,
      tipo,
      valor,
      unidade,
      dataRegistro: dataRegistro || new Date(),
    })

    res.status(201).json(novaMetrica)
  } catch (error) {
    logger.error(`Erro ao criar métrica: ${error.message}`)

    // Verifica se é um erro de validação do Sequelize
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Erro de validação",
        details: error.errors.map((e) => e.message),
      })
    }

    res.status(500).json({ error: "Erro ao criar métrica" })
  }
}

/**
 * Atualiza uma métrica existente
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const updateMetrica = async (req, res) => {
  try {
    const { id } = req.params
    const { iniciativaId, tipo, valor, unidade, dataRegistro } = req.body

    const metrica = await Metrica.findByPk(id)

    if (!metrica) {
      return res.status(404).json({ error: "Métrica não encontrada" })
    }

    // Se estiver atualizando a iniciativa, verifica se ela existe
    if (iniciativaId && iniciativaId !== metrica.iniciativaId) {
      const iniciativa = await Iniciativa.findByPk(iniciativaId)
      if (!iniciativa) {
        return res.status(404).json({ error: "Iniciativa não encontrada" })
      }
    }

    // Atualiza os campos
    await metrica.update({
      iniciativaId: iniciativaId || metrica.iniciativaId,
      tipo: tipo || metrica.tipo,
      valor: valor !== undefined ? valor : metrica.valor,
      unidade: unidade || metrica.unidade,
      dataRegistro: dataRegistro || metrica.dataRegistro,
    })

    res.status(200).json(metrica)
  } catch (error) {
    logger.error(`Erro ao atualizar métrica ${req.params.id}: ${error.message}`)

    // Verifica se é um erro de validação do Sequelize
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Erro de validação",
        details: error.errors.map((e) => e.message),
      })
    }

    res.status(500).json({ error: "Erro ao atualizar métrica" })
  }
}

/**
 * Remove uma métrica
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const deleteMetrica = async (req, res) => {
  try {
    const { id } = req.params

    const metrica = await Metrica.findByPk(id)

    if (!metrica) {
      return res.status(404).json({ error: "Métrica não encontrada" })
    }

    await metrica.destroy()

    res.status(200).json({ message: "Métrica removida com sucesso" })
  } catch (error) {
    logger.error(`Erro ao remover métrica ${req.params.id}: ${error.message}`)
    res.status(500).json({ error: "Erro ao remover métrica" })
  }
}

module.exports = {
  getAllMetricas,
  getMetricaById,
  createMetrica,
  updateMetrica,
  deleteMetrica,
}
