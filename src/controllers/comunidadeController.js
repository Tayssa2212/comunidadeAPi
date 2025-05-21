/**
 * Controlador para operações relacionadas a Comunidades
 * Gerencia as operações CRUD para o recurso Comunidade
 */

const { Comunidade, Morador, Iniciativa } = require("../models")
const logger = require("../utils/logger")
const { ApiError } = require("../middlewares/errorMiddleware")
const { Op } = require("sequelize")

/**
 * Obtém todas as comunidades com opções de filtro e paginação
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const getAllComunidades = async (req, res, next) => {
  try {
    const { nome, localizacao, ativa, page = 1, limit = 10, sort = "nome", order = "ASC" } = req.query

    // Construir condições de filtro
    const where = {}
    if (nome) where.nome = { [Op.iLike]: `%${nome}%` }
    if (localizacao) where.localizacao = { [Op.iLike]: `%${localizacao}%` }
    if (ativa !== undefined) where.ativa = ativa === "true"

    // Validar parâmetros de ordenação
    const validSortFields = ["nome", "localizacao", "dataFundacao", "created_at"]
    const validOrderValues = ["ASC", "DESC"]

    const sortField = validSortFields.includes(sort) ? sort : "nome"
    const orderValue = validOrderValues.includes(order.toUpperCase()) ? order.toUpperCase() : "ASC"

    // Calcular offset para paginação
    const pageNumber = Number.parseInt(page, 10)
    const limitNumber = Number.parseInt(limit, 10)
    const offset = (pageNumber - 1) * limitNumber

    // Buscar comunidades com paginação
    const { count, rows: comunidades } = await Comunidade.findAndCountAll({
      where,
      order: [[sortField, orderValue]],
      limit: limitNumber,
      offset,
    })

    // Calcular informações de paginação
    const totalPages = Math.ceil(count / limitNumber)
    const hasNext = pageNumber < totalPages
    const hasPrev = pageNumber > 1

    res.json({
      data: comunidades,
      pagination: {
        total: count,
        page: pageNumber,
        limit: limitNumber,
        totalPages,
        hasNext,
        hasPrev,
      },
    })
  } catch (error) {
    logger.error(`Erro ao buscar comunidades: ${error.message}`)
    next(error)
  }
}

/**
 * Obtém uma comunidade pelo ID
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const getComunidadeById = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new ApiError(400, "ID de comunidade inválido")
    }

    const comunidade = await Comunidade.findByPk(id, {
      include: [
        { model: Morador, as: "moradores" },
        { model: Iniciativa, as: "iniciativas" },
      ],
    })

    if (!comunidade) {
      throw new ApiError(404, "Comunidade não encontrada")
    }

    res.json(comunidade)
  } catch (error) {
    logger.error(`Erro ao buscar comunidade: ${error.message}`)
    next(error)
  }
}

/**
 * Cria uma nova comunidade
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const createComunidade = async (req, res, next) => {
  try {
    const { nome, localizacao, descricao, dataFundacao, metaSustentabilidade, ativa } = req.body

    // Validações adicionais
    if (!nome || nome.trim() === "") {
      throw new ApiError(400, "O nome da comunidade é obrigatório")
    }

    if (!localizacao || localizacao.trim() === "") {
      throw new ApiError(400, "A localização da comunidade é obrigatória")
    }

    // Verificar se já existe uma comunidade com o mesmo nome e localização
    const comunidadeExistente = await Comunidade.findOne({
      where: {
        nome: nome.trim(),
        localizacao: localizacao.trim(),
      },
    })

    if (comunidadeExistente) {
      throw new ApiError(409, "Já existe uma comunidade com este nome e localização")
    }

    const novaComunidade = await Comunidade.create({
      nome,
      localizacao,
      descricao,
      dataFundacao,
      metaSustentabilidade,
      ativa: ativa !== undefined ? ativa : true,
    })

    logger.info(`Nova comunidade criada: ${novaComunidade.nome} (ID: ${novaComunidade.id})`)
    res.status(201).json(novaComunidade)
  } catch (error) {
    logger.error(`Erro ao criar comunidade: ${error.message}`)

    // Tratamento específico para erros de validação do Sequelize
    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }))

      return next(new ApiError(400, "Erro de validação", validationErrors))
    }

    next(error)
  }
}

/**
 * Atualiza uma comunidade existente
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const updateComunidade = async (req, res, next) => {
  try {
    const { id } = req.params
    const { nome, localizacao, descricao, dataFundacao, metaSustentabilidade, ativa } = req.body

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new ApiError(400, "ID de comunidade inválido")
    }

    const comunidade = await Comunidade.findByPk(id)

    if (!comunidade) {
      throw new ApiError(404, "Comunidade não encontrada")
    }

    // Verificar se já existe outra comunidade com o mesmo nome e localização
    if (nome && localizacao) {
      const comunidadeExistente = await Comunidade.findOne({
        where: {
          nome: nome.trim(),
          localizacao: localizacao.trim(),
          id: { [Op.ne]: id },
        },
      })

      if (comunidadeExistente) {
        throw new ApiError(409, "Já existe outra comunidade com este nome e localização")
      }
    }

    await comunidade.update({
      nome: nome !== undefined ? nome : comunidade.nome,
      localizacao: localizacao !== undefined ? localizacao : comunidade.localizacao,
      descricao: descricao !== undefined ? descricao : comunidade.descricao,
      dataFundacao: dataFundacao !== undefined ? dataFundacao : comunidade.dataFundacao,
      metaSustentabilidade: metaSustentabilidade !== undefined ? metaSustentabilidade : comunidade.metaSustentabilidade,
      ativa: ativa !== undefined ? ativa : comunidade.ativa,
    })

    logger.info(`Comunidade atualizada: ${comunidade.nome} (ID: ${comunidade.id})`)
    res.json(comunidade)
  } catch (error) {
    logger.error(`Erro ao atualizar comunidade: ${error.message}`)

    // Tratamento específico para erros de validação do Sequelize
    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }))

      return next(new ApiError(400, "Erro de validação", validationErrors))
    }

    next(error)
  }
}

/**
 * Remove uma comunidade
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const deleteComunidade = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new ApiError(400, "ID de comunidade inválido")
    }

    const comunidade = await Comunidade.findByPk(id)

    if (!comunidade) {
      throw new ApiError(404, "Comunidade não encontrada")
    }

    // Verificar se há moradores ou iniciativas associados
    const [moradores, iniciativas] = await Promise.all([
      Morador.count({ where: { comunidadeId: id } }),
      Iniciativa.count({ where: { comunidadeId: id } }),
    ])

    if (moradores > 0 || iniciativas > 0) {
      // Opção 1: Impedir a exclusão
      // throw new ApiError(409, "Não é possível excluir a comunidade pois existem moradores ou iniciativas associados");

      // Opção 2: Exclusão em cascata (já configurada nas associações)
      logger.warn(`Comunidade ID ${id} excluída com ${moradores} moradores e ${iniciativas} iniciativas associados`)
    }

    await comunidade.destroy()

    logger.info(`Comunidade removida: ${comunidade.nome} (ID: ${comunidade.id})`)
    res.json({
      message: "Comunidade removida com sucesso",
      id: comunidade.id,
      nome: comunidade.nome,
    })
  } catch (error) {
    logger.error(`Erro ao remover comunidade: ${error.message}`)
    next(error)
  }
}

module.exports = {
  getAllComunidades,
  getComunidadeById,
  createComunidade,
  updateComunidade,
  deleteComunidade,
}
