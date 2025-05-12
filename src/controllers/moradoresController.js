/**
 * Controlador para operações relacionadas a Moradores
 * Implementa o CRUD completo para o modelo Morador
 */

const { Morador, Comunidade, Iniciativa } = require("../models")
const logger = require("../utils/logger")

/**
 * Obtém todos os moradores
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const getAllMoradores = async (req, res) => {
  try {
    const moradores = await Morador.findAll({
      include: [{ model: Comunidade, as: "comunidade" }],
    })
    res.status(200).json(moradores)
  } catch (error) {
    logger.error(`Erro ao buscar moradores: ${error.message}`)
    res.status(500).json({ error: "Erro ao buscar moradores" })
  }
}

/**
 * Obtém um morador pelo ID
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const getMoradorById = async (req, res) => {
  try {
    const { id } = req.params

    const morador = await Morador.findByPk(id, {
      include: [
        { model: Comunidade, as: "comunidade" },
        { model: Iniciativa, as: "iniciativasResponsavel" },
      ],
    })

    if (!morador) {
      return res.status(404).json({ error: "Morador não encontrado" })
    }

    res.status(200).json(morador)
  } catch (error) {
    logger.error(`Erro ao buscar morador ${req.params.id}: ${error.message}`)
    res.status(500).json({ error: "Erro ao buscar morador" })
  }
}

/**
 * Cria um novo morador
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const createMorador = async (req, res) => {
  try {
    const { nome, email, telefone, dataNascimento, comunidadeId } = req.body

    // Validação básica
    if (!nome || !email || !comunidadeId) {
      return res.status(400).json({ error: "Nome, email e comunidadeId são obrigatórios" })
    }

    // Verifica se a comunidade existe
    const comunidade = await Comunidade.findByPk(comunidadeId)
    if (!comunidade) {
      return res.status(404).json({ error: "Comunidade não encontrada" })
    }

    const novoMorador = await Morador.create({
      nome,
      email,
      telefone,
      dataNascimento,
      comunidadeId,
    })

    res.status(201).json(novoMorador)
  } catch (error) {
    logger.error(`Erro ao criar morador: ${error.message}`)

    // Verifica se é um erro de validação do Sequelize
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Erro de validação",
        details: error.errors.map((e) => e.message),
      })
    }

    // Verifica se é um erro de unicidade (email duplicado)
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "Email já cadastrado" })
    }

    res.status(500).json({ error: "Erro ao criar morador" })
  }
}

/**
 * Atualiza um morador existente
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const updateMorador = async (req, res) => {
  try {
    const { id } = req.params
    const { nome, email, telefone, dataNascimento, comunidadeId } = req.body

    const morador = await Morador.findByPk(id)

    if (!morador) {
      return res.status(404).json({ error: "Morador não encontrado" })
    }

    // Se estiver atualizando a comunidade, verifica se ela existe
    if (comunidadeId && comunidadeId !== morador.comunidadeId) {
      const comunidade = await Comunidade.findByPk(comunidadeId)
      if (!comunidade) {
        return res.status(404).json({ error: "Comunidade não encontrada" })
      }
    }

    // Atualiza os campos
    await morador.update({
      nome: nome || morador.nome,
      email: email || morador.email,
      telefone: telefone !== undefined ? telefone : morador.telefone,
      dataNascimento: dataNascimento || morador.dataNascimento,
      comunidadeId: comunidadeId || morador.comunidadeId,
    })

    res.status(200).json(morador)
  } catch (error) {
    logger.error(`Erro ao atualizar morador ${req.params.id}: ${error.message}`)

    // Verifica se é um erro de validação do Sequelize
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Erro de validação",
        details: error.errors.map((e) => e.message),
      })
    }

    // Verifica se é um erro de unicidade (email duplicado)
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "Email já cadastrado" })
    }

    res.status(500).json({ error: "Erro ao atualizar morador" })
  }
}

/**
 * Remove um morador
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const deleteMorador = async (req, res) => {
  try {
    const { id } = req.params

    const morador = await Morador.findByPk(id)

    if (!morador) {
      return res.status(404).json({ error: "Morador não encontrado" })
    }

    await morador.destroy()

    res.status(200).json({ message: "Morador removido com sucesso" })
  } catch (error) {
    logger.error(`Erro ao remover morador ${req.params.id}: ${error.message}`)
    res.status(500).json({ error: "Erro ao remover morador" })
  }
}

module.exports = {
  getAllMoradores,
  getMoradorById,
  createMorador,
  updateMorador,
  deleteMorador,
}
