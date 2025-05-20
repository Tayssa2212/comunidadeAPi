/**
 * Controlador para operações relacionadas a Iniciativas
 * Implementa o CRUD completo para o modelo Iniciativa
 */

const { Iniciativa, Comunidade, Morador } = require("../models")
const logger = require("../utils/logger")
// ↓ ALTERADO: Importando o responseHandler para padronização das respostas
const { success, error } = require("../utils/responseHandler")

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
    // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de sucesso
    return success(res, iniciativas, "Iniciativas recuperadas com sucesso")
  } catch (error) {
    logger.error(`Erro ao buscar iniciativas: ${error.message}`)
    // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
    return error(res, "Erro ao buscar iniciativas", 500)
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
      // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
      return error(res, "Iniciativa não encontrada", 404)
    }

    // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de sucesso
    return success(res, iniciativa, "Iniciativa recuperada com sucesso")
  } catch (err) {
    logger.error(`Erro ao buscar iniciativa ${req.params.id}: ${err.message}`)
    // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
    return error(res, "Erro ao buscar iniciativa", 500)
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
      // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
      return error(
        res, 
        "Título, categoria, comunidadeId e responsavelId são obrigatórios", 
        400
      )
    }

    // Verifica se a categoria é válida
    if (!Object.values(Iniciativa.CATEGORIAS).includes(categoria)) {
      // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
      return error(
        res, 
        "Categoria inválida", 
        400, 
        { validCategories: Object.values(Iniciativa.CATEGORIAS) }
      )
    }

    // Verifica se o status é válido
    if (status && !Object.values(Iniciativa.STATUS).includes(status)) {
      // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
      return error(
        res, 
        "Status inválido", 
        400, 
        { validStatus: Object.values(Iniciativa.STATUS) }
      )
    }

    // Verifica se a comunidade existe
    const comunidade = await Comunidade.findByPk(comunidadeId)
    if (!comunidade) {
      // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
      return error(res, "Comunidade não encontrada", 404)
    }

    // Verifica se o responsável existe
    const responsavel = await Morador.findByPk(responsavelId)
    if (!responsavel) {
      // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
      return error(res, "Responsável não encontrado", 404)
    }

    // Verifica se o responsável pertence à comunidade
    if (responsavel.comunidadeId !== comunidadeId) {
      // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
      return error(
        res, 
        "O responsável deve pertencer à comunidade da iniciativa", 
        400
      )
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

    // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de sucesso
    return success(res, novaIniciativa, "Iniciativa criada com sucesso", 201)
  } catch (err) {
    logger.error(`Erro ao criar iniciativa: ${err.message}`)

    // Verifica se é um erro de validação do Sequelize
    if (err.name === "SequelizeValidationError") {
      // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
      return error(
        res, 
        "Erro de validação", 
        400, 
        { details: err.errors.map((e) => e.message) }
      )
    }

    // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
    return error(res, "Erro ao criar iniciativa", 500)
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
      // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
      return error(res, "Iniciativa não encontrada", 404)
    }

    // Validações para categoria e status
    if (categoria && !Object.values(Iniciativa.CATEGORIAS).includes(categoria)) {
      // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
      return error(
        res, 
        "Categoria inválida", 
        400, 
        { validCategories: Object.values(Iniciativa.CATEGORIAS) }
      )
    }

    if (status && !Object.values(Iniciativa.STATUS).includes(status)) {
      // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
      return error(
        res, 
        "Status inválido", 
        400, 
        { validStatus: Object.values(Iniciativa.STATUS) }
      )
    }

    // Validações para referências externas
    if (comunidadeId) {
      const comunidade = await Comunidade.findByPk(comunidadeId)
      if (!comunidade) {
        // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
        return error(res, "Comunidade não encontrada", 404)
      }
    }

    if (responsavelId) {
      const responsavel = await Morador.findByPk(responsavelId)
      if (!responsavel) {
        // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
        return error(res, "Responsável não encontrado", 404)
      }

      // Verifica se o responsável pertence à comunidade
      const comunidadeIdFinal = comunidadeId || iniciativa.comunidadeId
      if (responsavel.comunidadeId !== comunidadeIdFinal) {
        // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
        return error(
          res, 
          "O responsável deve pertencer à comunidade da iniciativa", 
          400
        )
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

    // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de sucesso
    return success(res, iniciativa, "Iniciativa atualizada com sucesso")
  } catch (err) {
    logger.error(`Erro ao atualizar iniciativa ${req.params.id}: ${err.message}`)

    // Verifica se é um erro de validação do Sequelize
    if (err.name === "SequelizeValidationError") {
      // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
      return error(
        res, 
        "Erro de validação", 
        400, 
        { details: err.errors.map((e) => e.message) }
      )
    }

    // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
    return error(res, "Erro ao atualizar iniciativa", 500)
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
      // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
      return error(res, "Iniciativa não encontrada", 404)
    }

    await iniciativa.destroy()

    // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de sucesso
    return success(res, null, "Iniciativa removida com sucesso")
  } catch (err) {
    logger.error(`Erro ao remover iniciativa ${req.params.id}: ${err.message}`)
    // ↓ ALTERADO: Utilizando responseHandler para padronizar resposta de erro
    return error(res, "Erro ao remover iniciativa", 500)
  }
}

module.exports = {
  getAllIniciativas,
  getIniciativaById,
  createIniciativa,
  updateIniciativa,
  deleteIniciativa,
}
