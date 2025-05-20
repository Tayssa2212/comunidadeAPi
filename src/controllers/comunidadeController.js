/**
 * Controlador para operações relacionadas a Comunidades
 * Implementa o CRUD completo para o modelo Comunidade
 */

const { Comunidade, Morador, Iniciativa } = require("../models")
const logger = require("../utils/logger")
const { success, error } = require("../utils/responseHandler");

/**
 * Obtém todas as comunidades
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const getAllComunidades = async (req, res) => {
  try {
    const comunidades = await Comunidade.findAll();
    // ↓ ALTERADO
    return success(res, comunidades, "Comunidades listadas com sucesso");
  } catch (err) {
    logger.error(`Erro ao buscar comunidades: ${err.message}`);
    // ↓ ALTERADO
    return error(res, "Erro ao buscar comunidades", 500, err.message);
  }
};

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
      // ↓ ALTERADO
      return error(res, "Comunidade não encontrada", 404);
    }

    return success(res, comunidade, "Comunidade recuperada com sucesso");
  } catch (err) {
    logger.error(`Erro ao buscar comunidade ${req.params.id}: ${error.message}`)
    // ↓ ALTERADO
    return error(res, "Erro ao buscar comunidade", 500, err.message);
  }
};

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
      return error(res, "Nome e localização são obrigatórios", 400);
    }

    const novaComunidade = await Comunidade.create({
      nome,
      localizacao,
      descricao,
      dataFundacao,
      metaSustentabilidade,
    });

    return success(res, novaComunidade, "Comunidade criada com sucesso", 201);
  } catch (err) {
    logger.error(`Erro ao criar comunidade: ${error.message}`)

    // Verifica se é um erro de validação do Sequelize
    if (err.name === "SequelizeValidationError") {
      // ↓ ALTERADO
      return error(res, "Erro de validação", 400, err.errors.map(e => e.message));
    }

    // ↓ ALTERADO
    return error(res, "Erro ao criar comunidade", 500, err.message);
  }
};

/**
 * Atualiza uma comunidade existente
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const updateComunidade = async (req, res) => {
  try {
    const { id } = req.params
    const { nome, localizacao, descricao, dataFundacao, metaSustentabilidade } = req.body

    const comunidade = await Comunidade.findByPk(id);
    if (!comunidade) {
      // ↓ ALTERADO
      return error(res, "Comunidade não encontrada", 404);
    }

    // Atualiza os campos
    await comunidade.update({
      nome: nome || comunidade.nome,
      localizacao: localizacao || comunidade.localizacao,
      descricao: descricao !== undefined ? descricao : comunidade.descricao,
      dataFundacao: dataFundacao || comunidade.dataFundacao,
      metaSustentabilidade: metaSustentabilidade !== undefined ? metaSustentabilidade : comunidade.metaSustentabilidade,
    })

    // ↓ ALTERADO
    return success(res, comunidade, "Comunidade atualizada com sucesso");
  } catch (err) {
    logger.error(`Erro ao atualizar comunidade ${req.params.id}: ${err.message}`);

    if (err.name === "SequelizeValidationError") {
      // ↓ ALTERADO
      return error(res, "Erro de validação", 400, err.errors.map(e => e.message));
    }

    // ↓ ALTERADO
    return error(res, "Erro ao atualizar comunidade", 500, err.message);
  }
};

/**
 * Remove uma comunidade
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const deleteComunidade = async (req, res) => {
  try {
    const { id } = req.params;

    const comunidade = await Comunidade.findByPk(id);
    if (!comunidade) {
      // ↓ ALTERADO
      return error(res, "Comunidade não encontrada", 404);
    }

    await comunidade.destroy();

    // ↓ ALTERADO
    return success(res, null, "Comunidade removida com sucesso");
  } catch (err) {
    logger.error(`Erro ao remover comunidade ${req.params.id}: ${err.message}`);
    // ↓ ALTERADO
    return error(res, "Erro ao remover comunidade", 500, err.message);
  }
};

module.exports = {
  getAllComunidades,
  getComunidadeById,
  createComunidade,
  updateComunidade,
  deleteComunidade,
}
