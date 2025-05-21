/**
 * Controlador para operações relacionadas a Métricas
 * Implementa o CRUD completo para o modelo Metrica
 */

const { Metrica, Iniciativa } = require("../models")
const logger = require("../utils/logger")
const { success, error } = require("../utils/responseHandler");

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
    // ↓ ALTERADO: utiliza success()
    return success(res, metricas, "Métricas listadas com sucesso");
  } catch (erro) {
    logger.error(`Erro ao buscar métricas: ${error.message}`)
    // ↓ ALTERADO: utiliza error()
    return error(res, "Erro ao buscar métricas", 500, err.message);
  }
};

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
      // ↓ ALTERADO: utiliza error()
      return error(res, "Métrica não encontrada", 404);
    }

    return success(res, metrica, "Métrica recuperada com sucesso");
  } catch (erro) {
    logger.error(`Erro ao buscar métrica ${req.params.id}: ${error.message}`)
    // ↓ ALTERADO: utiliza error()
    return error(res, "Erro ao buscar métrica", 500, err.message);
  }
};

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
      // ↓ ALTERADO: utiliza error()
      return error(
        res,
        "IniciativaId, tipo, valor e unidade são obrigatórios",
        400
      );
    }

    // Verifica se a iniciativa existe
    const iniciativa = await Iniciativa.findByPk(iniciativaId)
    if (!iniciativa) {
      // ↓ ALTERADO: utiliza error()
      return error(res, "Iniciativa não encontrada", 404);
    }

    const novaMetrica = await Metrica.create({
      iniciativaId,
      tipo,
      valor,
      unidade,
      dataRegistro: dataRegistro || new Date(),
    })

    // ↓ ALTERADO: utiliza success()
    return success(res, novaMetrica, "Métrica criada com sucesso", 201);
  } catch (erro) {
    logger.error(`Erro ao criar métrica: ${error.message}`)

    // Verifica se é um erro de validação do Sequelize
    if (error.name === "SequelizeValidationError") {
     // ↓ ALTERADO: utiliza error()
     return error(
      res,
      "Erro de validação",
      400,
      err.errors.map((e) => e.message)
    );
    }

    // ↓ ALTERADO: utiliza error()
    return error(res, "Erro ao criar métrica", 500, err.message);
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
      // ↓ ALTERADO: utiliza error()
      return error(res, "Métrica não encontrada", 404);
    }

    // Se estiver atualizando a iniciativa, verifica se ela existe
    if (iniciativaId && iniciativaId !== metrica.iniciativaId) {
      const iniciativa = await Iniciativa.findByPk(iniciativaId)
      if (!iniciativa) {
        // ↓ ALTERADO: utiliza error()
        return error(res, "Iniciativa não encontrada", 404);
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

    // ↓ ALTERADO: utiliza success()
    return success(res, metrica, "Métrica atualizada com sucesso");
  } catch (err) {
    logger.error(`Erro ao atualizar métrica ${req.params.id}: ${err.message}`);
    
    // Verifica se é um erro de validação do Sequelize
    if (error.name === "SequelizeValidationError") {
      // ↓ ALTERADO: utiliza error()
      return error(
        res,
        "Erro de validação",
        400,
        err.errors.map((e) => e.message)
      );
    }

    // ↓ ALTERADO: utiliza error()
    return error(res, "Erro ao atualizar métrica", 500, err.message);
  }
};

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
      // ↓ ALTERADO: utiliza error()
      return error(res, "Métrica não encontrada", 404);
    }

    await metrica.destroy()

    // ↓ ALTERADO: utiliza success()
    return success(res, null, "Métrica removida com sucesso");
  } catch (err) {
    logger.error(`Erro ao remover métrica ${req.params.id}: ${error.message}`)
    // ↓ ALTERADO: utiliza error()
    return error(res, "Erro ao remover métrica", 500, err.message);
  }
};

module.exports = {
  getAllMetricas,
  getMetricaById,
  createMetrica,
  updateMetrica,
  deleteMetrica,
};
