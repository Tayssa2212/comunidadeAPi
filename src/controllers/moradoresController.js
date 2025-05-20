/**
 * Controlador para operações relacionadas a Moradores
 * Implementa o CRUD completo para o modelo Morador
 */

const { Morador, Comunidade, Iniciativa } = require("../models")
const logger = require("../utils/logger")
const { success, error } = require("../utils/responseHandler"); // <-- ADICIONADO: para padronizar as respostas


/**
 * Obtém todos os moradores
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const getAllMoradores = async (req, res) => {
  try {
    const moradores = await Morador.findAll({
      include: [{ model: Comunidade, as: "comunidade" }],
    });

    // ↓ ALTERADO: resposta formatada com função de sucesso
    return success(res, moradores, "Moradores listados com sucesso");

  } catch (err) {
    logger.error(`Erro ao buscar moradores: ${err.message}`);

    // ↓ ALTERADO: resposta formatada com função de erro
    return error(res, "Erro ao buscar moradores", 500, err.message);
  }
};

/**
 * Obtém um morador pelo ID
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const getMoradorById = async (req, res) => {
  try {
    const { id } = req.params;

    const morador = await Morador.findByPk(id, {
      include: [
        { model: Comunidade, as: "comunidade" },
        { model: Iniciativa, as: "iniciativasResponsavel" },
      ],
    });

    if (!morador) {
      // ↓ ALTERADO: resposta formatada com função de erro
      return error(res, "Morador não encontrado", 404);
    }

    // ↓ ALTERADO: resposta formatada com função de sucesso
    return success(res, morador, "Morador encontrado com sucesso");

  } catch (err) {
    logger.error(`Erro ao buscar morador ${req.params.id}: ${err.message}`);

    // ↓ ALTERADO: resposta formatada com função de erro
    return error(res, "Erro ao buscar morador", 500, err.message);
  }
};

/**
 * Cria um novo morador
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const createMorador = async (req, res) => {
  try {
    const { nome, email, telefone, dataNascimento, comunidadeId } = req.body;

    if (!nome || !email || !comunidadeId) {
      // ↓ ALTERADO: resposta formatada com função de erro
      return error(res, "Nome, email e comunidadeId são obrigatórios", 400);
    }

    const comunidade = await Comunidade.findByPk(comunidadeId);
    if (!comunidade) {
      // ↓ ALTERADO: resposta formatada com função de erro
      return error(res, "Comunidade não encontrada", 404);
    }

    const novoMorador = await Morador.create({
      nome,
      email,
      telefone,
      dataNascimento,
      comunidadeId,
    });

    // ↓ ALTERADO: resposta formatada com função de sucesso
    return success(res, novoMorador, "Morador criado com sucesso", 201);

  } catch (err) {
    logger.error(`Erro ao criar morador: ${err.message}`);

    if (err.name === "SequelizeValidationError") {
      // ↓ ALTERADO: resposta formatada com função de erro
      return error(res, "Erro de validação", 400, err.errors.map((e) => e.message));
    }

    if (err.name === "SequelizeUniqueConstraintError") {
      // ↓ ALTERADO: resposta formatada com função de erro
      return error(res, "Email já cadastrado", 400);
    }

    // ↓ ALTERADO: resposta formatada com função de erro
    return error(res, "Erro ao criar morador", 500, err.message);
  }
};

/**
 * Atualiza um morador existente
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const updateMorador = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, dataNascimento, comunidadeId } = req.body;

    const morador = await Morador.findByPk(id);
    if (!morador) {
      // ↓ ALTERADO: resposta formatada com função de erro
      return error(res, "Morador não encontrado", 404);
    }

    if (comunidadeId && comunidadeId !== morador.comunidadeId) {
      const comunidade = await Comunidade.findByPk(comunidadeId);
      if (!comunidade) {
        // ↓ ALTERADO: resposta formatada com função de erro
        return error(res, "Comunidade não encontrada", 404);
      }
    }

    await morador.update({
      nome: nome || morador.nome,
      email: email || morador.email,
      telefone: telefone !== undefined ? telefone : morador.telefone,
      dataNascimento: dataNascimento || morador.dataNascimento,
      comunidadeId: comunidadeId || morador.comunidadeId,
    });

    // ↓ ALTERADO: resposta formatada com função de sucesso
    return success(res, morador, "Morador atualizado com sucesso");

  } catch (err) {
    logger.error(`Erro ao atualizar morador ${req.params.id}: ${err.message}`);

    if (err.name === "SequelizeValidationError") {
      // ↓ ALTERADO: resposta formatada com função de erro
      return error(res, "Erro de validação", 400, err.errors.map((e) => e.message));
    }

    if (err.name === "SequelizeUniqueConstraintError") {
      // ↓ ALTERADO: resposta formatada com função de erro
      return error(res, "Email já cadastrado", 400);
    }

    // ↓ ALTERADO: resposta formatada com função de erro
    return error(res, "Erro ao atualizar morador", 500, err.message);
  }
};

/**
 * Remove um morador
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const deleteMorador = async (req, res) => {
  try {
    const { id } = req.params;

    const morador = await Morador.findByPk(id);
    if (!morador) {
      // ↓ ALTERADO: resposta formatada com função de erro
      return error(res, "Morador não encontrado", 404);
    }

    await morador.destroy();

    // ↓ ALTERADO: resposta formatada com função de sucesso
    return success(res, null, "Morador removido com sucesso");

  } catch (err) {
    logger.error(`Erro ao remover morador ${req.params.id}: ${err.message}`);

    // ↓ ALTERADO: resposta formatada com função de erro
    return error(res, "Erro ao remover morador", 500, err.message);
  }
};

module.exports = {
  getAllMoradores,
  getMoradorById,
  createMorador,
  updateMorador,
  deleteMorador,
};