/**
 * Controlador para operações relacionadas a Iniciativas
 * Implementa o CRUD completo para o modelo Iniciativa
 */

const { Iniciativa, Comunidade, Morador } = require("../models")
const logger = require("../utils/logger")

/**
 * Obtém todas as iniciativas
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const getAllIniciativas = async (req, res) => {
  try {
    const iniciativas = await Iniciativa.findAll({
      include: [
        { model: Comunidade, as: "comunidade" },
        { model: Morador, as: "responsavel" },
      ],
    })
    res.status(200).json(iniciativas)
  } catch (error) {
    logger.error(`Erro ao buscar iniciativas: ${error.message}`)
    res.status(500).json({ error: "Erro ao buscar iniciativas" })
  }
}

/**
 * Obtém uma iniciativa pelo ID
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const getIniciativaById = async (req, res) => {
  try {
    const { id } = req.params

    const iniciativa = await Iniciativa.findByPk(id, {
      include: [
        { model: Comunidade, as: "comunidade" },
        { model: Morador, as: "responsavel" },
      ],
    })

    if (!iniciativa) {
      return res.status(404).json({ error: "Iniciativa não encontrada" })
    }

    res.status(200).json(iniciativa)
  } catch (error) {
    logger.error(`Erro ao buscar iniciativa ${req.params.id}: ${error.message}`)
    res.status(500).json({ error: "Erro ao buscar iniciativa" })
  }
}

/**
 * Cria uma nova iniciativa
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const createIniciativa = async (req, res) => {
  try {
    const { titulo, descricao, categoria, dataInicio, dataFim, status, comunidadeId, responsavelId } = req.body

    // Validação básica
    if (!titulo || !categoria || !comunidadeId || !responsavelId) {
      return res.status(400).json({
        error: "Título, categoria, comunidadeId e responsavelId são obrigatórios",
      })
    }

    // Verifica se a categoria é válida
    if (!Object.values(Iniciativa.CATEGORIAS).includes(categoria)) {
      return res.status(400).json({
        error: "Categoria inválida",
        validCategories: Object.values(Iniciativa.CATEGORIAS),
      })
    }

    // Verifica se o status é válido
    if (status && !Object.values(Iniciativa.STATUS).includes(status)) {
      return res.status(400).json({
        error: "Status inválido",
        validStatus: Object.values(Iniciativa.STATUS),
      })
    }

    // Verifica se a comunidade existe
    const comunidade = await Comunidade.findByPk(comunidadeId)
    if (!comunidade) {
      return res.status(404).json({ error: "Comunidade não encontrada" })
    }

    // Verifica se o responsável existe
    const responsavel = await Morador.findByPk(responsavelId)
    if (!responsavel) {
      return res.status(404).json({ error: "Responsável não encontrado" })
    }

    // Verifica se o responsável pertence à comunidade
    if (responsavel.comunidadeId !== comunidadeId) {
      return res.status(400).json({
        error: "O responsável deve pertencer à comunidade da iniciativa",
      })
    }

    const novaIniciativa = await Iniciativa.create({
      titulo,
      descricao,
      categoria,
      dataInicio,
      dataFim,
      status: status || Iniciativa.STATUS.PLANEJADA,
      comunidadeId,
      responsavelId,
    })

    res.status(201).json(novaIniciativa)
  } catch (error) {
    logger.error(`Erro ao criar iniciativa: ${error.message}`)

    // Verifica se é um erro de validação do Sequelize
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Erro de validação",
        details: error.errors.map((e) => e.message),
      })
    }

    res.status(500).json({ error: "Erro ao criar iniciativa" })
  }
}

/**
 * Atualiza uma iniciativa existente
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const updateIniciativa = async (req, res) => {
  try {
    const { id } = req.params
    const { titulo, descricao, categoria, dataInicio, dataFim, status, comunidadeId, responsavelId } = req.body

    const iniciativa = await Iniciativa.findByPk(id)

    if (!iniciativa) {
      return res.status(404).json({ error: "Iniciativa não encontrada" })
    }

    // Validações para categoria e status
    if (categoria && !Object.values(Iniciativa.CATEGORIAS).includes(categoria)) {
      return res.status(400).json({
        error: "Categoria inválida",
        validCategories: Object.values(Iniciativa.CATEGORIAS),
      })
    }

    if (status && !Object.values(Iniciativa.STATUS).includes(status)) {
      return res.status(400).json({
        error: "Status inválido",
        validStatus: Object.values(Iniciativa.STATUS),
      })
    }

    // Validações para referências externas
    if (comunidadeId) {
      const comunidade = await Comunidade.findByPk(comunidadeId)
      if (!comunidade) {
        return res.status(404).json({ error: "Comunidade não encontrada" })
      }
    }

    if (responsavelId) {
      const responsavel = await Morador.findByPk(responsavelId)
      if (!responsavel) {
        return res.status(404).json({ error: "Responsável não encontrado" })
      }

      // Verifica se o responsável pertence à comunidade
      const comunidadeIdFinal = comunidadeId || iniciativa.comunidadeId
      if (responsavel.comunidadeId !== comunidadeIdFinal) {
        return res.status(400).json({
          error: "O responsável deve pertencer à comunidade da iniciativa",
        })
      }
    }

    // Atualiza os campos
    await iniciativa.update({
      titulo: titulo || iniciativa.titulo,
      descricao: descricao !== undefined ? descricao : iniciativa.descricao,
      categoria: categoria || iniciativa.categoria,
      dataInicio: dataInicio || iniciativa.dataInicio,
      dataFim: dataFim !== undefined ? dataFim : iniciativa.dataFim,
      status: status || iniciativa.status,
      comunidadeId: comunidadeId || iniciativa.comunidadeId,
      responsavelId: responsavelId || iniciativa.responsavelId,
    })

    res.status(200).json(iniciativa)
  } catch (error) {
    logger.error(`Erro ao atualizar iniciativa ${req.params.id}: ${error.message}`)

    // Verifica se é um erro de validação do Sequelize
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Erro de validação",
        details: error.errors.map((e) => e.message),
      })
    }

    res.status(500).json({ error: "Erro ao atualizar iniciativa" })
  }
}

/**
 * Remove uma iniciativa
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const deleteIniciativa = async (req, res) => {
  try {
    const { id } = req.params

    const iniciativa = await Iniciativa.findByPk(id)

    if (!iniciativa) {
      return res.status(404).json({ error: "Iniciativa não encontrada" })
    }

    await iniciativa.destroy()

    res.status(200).json({ message: "Iniciativa removida com sucesso" })
  } catch (error) {
    logger.error(`Erro ao remover iniciativa ${req.params.id}: ${error.message}`)
    res.status(500).json({ error: "Erro ao remover iniciativa" })
  }
}

module.exports = {
  getAllIniciativas,
  getIniciativaById,
  createIniciativa,
  updateIniciativa,
  deleteIniciativa,
}
