/**
 * Controlador para operações relacionadas a Iniciativas
 */

const { Iniciativa, Comunidade, Morador, Metrica } = require("../models")
const logger = require("../utils/logger")

/**
 * Obtém todas as iniciativas
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const getAllIniciativas = async (req, res, next) => {
  try {
    const iniciativas = await Iniciativa.findAll({
      include: [
        { model: Comunidade, as: "comunidade" },
        { model: Morador, as: "responsavel" },
      ],
    })
    res.json(iniciativas)
  } catch (error) {
    logger.error(`Erro ao buscar iniciativas: ${error.message}`)
    next(error)
  }
}

/**
 * Obtém uma iniciativa pelo ID
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const getIniciativaById = async (req, res, next) => {
  try {
    const { id } = req.params

    const iniciativa = await Iniciativa.findByPk(id, {
      include: [
        { model: Comunidade, as: "comunidade" },
        { model: Morador, as: "responsavel" },
        { model: Metrica, as: "metricas" },
      ],
    })

    if (!iniciativa) {
      return res.status(404).json({ message: "Iniciativa não encontrada" })
    }

    res.json(iniciativa)
  } catch (error) {
    logger.error(`Erro ao buscar iniciativa: ${error.message}`)
    next(error)
  }
}

/**
 * Cria uma nova iniciativa
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const createIniciativa = async (req, res, next) => {
  try {
    const { titulo, descricao, categoria, dataInicio, dataFim, status, comunidadeId, responsavelId } = req.body

    // Verifica se a comunidade existe
    const comunidade = await Comunidade.findByPk(comunidadeId)
    if (!comunidade) {
      return res.status(404).json({ message: "Comunidade não encontrada" })
    }

    // Verifica se o responsável existe, se fornecido
    if (responsavelId) {
      const responsavel = await Morador.findByPk(responsavelId)
      if (!responsavel) {
        return res.status(404).json({ message: "Responsável não encontrado" })
      }
    }

    const novaIniciativa = await Iniciativa.create({
      titulo,
      descricao,
      categoria,
      dataInicio,
      dataFim,
      status,
      comunidadeId,
      responsavelId,
    })

    res.status(201).json(novaIniciativa)
  } catch (error) {
    logger.error(`Erro ao criar iniciativa: ${error.message}`)
    next(error)
  }
}

/**
 * Atualiza uma iniciativa existente
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const updateIniciativa = async (req, res, next) => {
  try {
    const { id } = req.params
    const { titulo, descricao, categoria, dataInicio, dataFim, status, comunidadeId, responsavelId } = req.body

    const iniciativa = await Iniciativa.findByPk(id)

    if (!iniciativa) {
      return res.status(404).json({ message: "Iniciativa não encontrada" })
    }

    // Verifica se a comunidade existe, se fornecida
    if (comunidadeId) {
      const comunidade = await Comunidade.findByPk(comunidadeId)
      if (!comunidade) {
        return res.status(404).json({ message: "Comunidade não encontrada" })
      }
    }

    // Verifica se o responsável existe, se fornecido
    if (responsavelId) {
      const responsavel = await Morador.findByPk(responsavelId)
      if (!responsavel) {
        return res.status(404).json({ message: "Responsável não encontrado" })
      }
    }

    await iniciativa.update({
      titulo,
      descricao,
      categoria,
      dataInicio,
      dataFim,
      status,
      comunidadeId,
      responsavelId,
    })

    res.json(iniciativa)
  } catch (error) {
    logger.error(`Erro ao atualizar iniciativa: ${error.message}`)
    next(error)
  }
}

/**
 * Remove uma iniciativa
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const deleteIniciativa = async (req, res, next) => {
  try {
    const { id } = req.params

    const iniciativa = await Iniciativa.findByPk(id)

    if (!iniciativa) {
      return res.status(404).json({ message: "Iniciativa não encontrada" })
    }

    await iniciativa.destroy()

    res.json({ message: "Iniciativa removida com sucesso" })
  } catch (error) {
    logger.error(`Erro ao remover iniciativa: ${error.message}`)
    next(error)
  }
}

module.exports = {
  getAllIniciativas,
  getIniciativaById,
  createIniciativa,
  updateIniciativa,
  deleteIniciativa,
}
