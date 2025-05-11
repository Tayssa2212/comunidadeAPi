/**
 * Middleware para tratamento de erros
 * Centraliza o tratamento de exceções na aplicação
 */

const logger = require("../utils/logger");

/**
 * Middleware que captura e trata erros na aplicação
 * @param {Error} err - Objeto de erro
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const errorMiddleware = (err, req, res, next) => {
  // Registra o erro no log
  logger.error(`Erro: ${err.message}`);
  logger.error(err.stack);

  // Determina o código de status HTTP
  const statusCode = err.statusCode || 500;

  // Determina a mensagem de erro
  const message = err.message || "Erro interno do servidor";

  // Informações adicionais para ambiente de desenvolvimento
  const additionalInfo = process.env.NODE_ENV === "development" 
    ? { stack: err.stack } 
    : {};

  // Envia a resposta de erro
  res.status(statusCode).json({
    error: message,
    ...additionalInfo
  });
};

module.exports = errorMiddleware;
