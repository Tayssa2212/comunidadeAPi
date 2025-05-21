/**
 * Controlador para operações relacionadas à documentação
 */

const config = require("../config/config")
const logger = require("../utils/logger")

/**
 * Obtém informações sobre a API
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const getApiInfo = async (req, res, next) => {
  try {
    const apiInfo = {
      name: config.app.name,
      version: config.app.version,
      description: config.app.description,
      endpoints: {
        comunidades: `${config.server.baseUrl}/api/comunidades`,
        moradores: `${config.server.baseUrl}/api/moradores`,
        iniciativas: `${config.server.baseUrl}/api/iniciativas`,
        metricas: `${config.server.baseUrl}/api/metricas`,
        dashboard: `${config.server.baseUrl}/api/dashboard`,
        docs: `${config.server.baseUrl}/api-docs`,
      },
    }

    res.json(apiInfo)
  } catch (error) {
    logger.error(`Erro ao obter informações da API: ${error.message}`)
    next(error)
  }
}

module.exports = {
  getApiInfo,
}
