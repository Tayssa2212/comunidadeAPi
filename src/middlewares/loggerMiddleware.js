/**
 * Middleware para registro de logs de requisições
 * Registra detalhes sobre cada requisição recebida pela API
 */

const logger = require("../utils/logger");

/**
 * Middleware que registra informações sobre as requisições
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const loggerMiddleware = (req, res, next) => {
  // Captura o tempo de início da requisição
  const start = Date.now();
  
  // Registra detalhes da requisição
  logger.info(`${req.method} ${req.originalUrl}`);
  
  // Quando a resposta for finalizada
  res.on("finish", () => {
    // Calcula a duração da requisição
    const duration = Date.now() - start;
    
    // Registra detalhes da resposta
    logger.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
    );
  });
  
  // Passa para o próximo middleware
  next();
};

module.exports = loggerMiddleware;