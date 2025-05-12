/**
 * Controlador para operações relacionadas a Comunidades
 * Implementa o CRUD completo para o modelo Comunidade
 */

const { Comunidade, Morador, Iniciativa } = require("../models")
const logger = require("../utils/logger")

/**
 * Obtém todas as comunidades
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const getAllComunidades = async (req, res) => {
  try {
    const comunidades = await Comunidade.findAll()
    res.status(200).json(comunidades)
  } catch (error) {
    logger.error(`Erro ao buscar comunidades: ${error.message}`)
    res.status(500).json({ error: "Erro ao buscar comunidades" })
  }
}

/**
 * Obtém uma comunidade pelo ID
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const getComunidadeById = async (req, res) => {
  try {
    const { id } = req.params

    const comunidade = await Comunidade.findByPk(id, {
      include: [
        { model: Morador, as: "moradores" },
        { model: Iniciativa, as: "iniciativas" },
      ],
    })

    if (!comunidade) {
      return res.status(404).json({ error: "Comunidade não encontrada" })
    }

    res.status(200).json(comunidade)
  } catch (error) {
    logger.error(`Erro ao buscar comunidade ${req.params.id}: ${error.message}`)
    res.status(500).json({ error: "Erro ao buscar comunidade" })
  }
}

/**
 * Cria uma nova comunidade
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const createComunidade = async (req, res) => {
  try {
    const { nome, localizacao, descricao, dataFundacao, metaSustentabilidade } = req.body

    // Validação básica
    if (!nome || !localizacao) {
      return res.status(400).json({ error: "Nome e localização são obrigatórios" })
    }

    const novaComunidade = await Comunidade.create({
      nome,
      localizacao,
      descricao,
      dataFundacao,
      metaSustentabilidade,
    })

    res.status(201).json(novaComunidade)
  } catch (error) {
    logger.error(`Erro ao criar comunidade: ${error.message}`)

    // Verifica se é um erro de validação do Sequelize
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Erro de validação",
        details: error.errors.map((e) => e.message),
      })
    }

    res.status(500).json({ error: "Erro ao criar comunidade" })
  }
}

/**
 * Atualiza uma comunidade existente
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const updateComunidade = async (req, res) => {
  try {
    const { id } = req.params
    const { nome, localizacao, descricao, dataFundacao, metaSustentabilidade } = req.body

    const comunidade = await Comunidade.findByPk(id)

    if (!comunidade) {
      return res.status(404).json({ error: "Comunidade não encontrada" })
    }

    // Atualiza os campos
    await comunidade.update({
      nome: nome || comunidade.nome,
      localizacao: localizacao || comunidade.localizacao,
      descricao: descricao !== undefined ? descricao : comunidade.descricao,
      dataFundacao: dataFundacao || comunidade.dataFundacao,
      metaSustentabilidade: metaSustentabilidade !== undefined ? metaSustentabilidade : comunidade.metaSustentabilidade,
    })

    res.status(200).json(comunidade)
  } catch (error) {
    logger.error(`Erro ao atualizar comunidade ${req.params.id}: ${error.message}`)

    // Verifica se é um erro de validação do Sequelize
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Erro de validação",
        details: error.errors.map((e) => e.message),
      })
    }

    res.status(500).json({ error: "Erro ao atualizar comunidade" })
  }
}

/**
 * Remove uma comunidade
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const deleteComunidade = async (req, res) => {
  try {
    const { id } = req.params

    const comunidade = await Comunidade.findByPk(id)

    if (!comunidade) {
      return res.status(404).json({ error: "Comunidade não encontrada" })
    }

    await comunidade.destroy()

    res.status(200).json({ message: "Comunidade removida com sucesso" })
  } catch (error) {
    logger.error(`Erro ao remover comunidade ${req.params.id}: ${error.message}`)
    res.status(500).json({ error: "Erro ao remover comunidade" })
  }
}

module.exports = {
  getAllComunidades,
  getComunidadeById,
  createComunidade,
  updateComunidade,
  deleteComunidade,
}
