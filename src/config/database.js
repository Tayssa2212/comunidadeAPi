/**
 * Configuração de conexão com o banco de dados
 * Estabelece e gerencia a conexão com o PostgreSQL usando Sequelize
 */

const { Sequelize } = require("sequelize")
const config = require("./config")
const logger = require("../utils/logger")
const fs = require("fs")
const path = require("path")

// Cria o diretório de logs se não existir
const logDir = path.dirname(config.logging.file)
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true })
}

// Determina o ambiente atual
const env = process.env.NODE_ENV || "development"
const dbConfig = config.database[env]

// Inicializa o Sequelize com a configuração apropriada
const sequelize = new Sequelize(dbConfig.url, {
  dialect: dbConfig.dialect,
  logging: dbConfig.logging ? (msg) => logger.debug(msg) : false,
  dialectOptions: dbConfig.dialectOptions,
  define: dbConfig.define,
  pool: dbConfig.pool || {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  retry: {
    max: 5,
    match: [
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/,
      /TimeoutError/,
    ],
    backoffBase: 100,
    backoffExponent: 1.1,
  },
  benchmark: process.env.NODE_ENV === "development",
})

/**
 * Testa a conexão com o banco de dados
 * @returns {Promise<boolean>} Retorna true se a conexão for bem-sucedida
 */
const testConnection = async () => {
  try {
    await sequelize.authenticate()
    logger.info("✅ Conexão com o banco de dados estabelecida com sucesso.")
    return true
  } catch (error) {
    logger.error(`❌ Erro ao conectar ao banco de dados: ${error.message}`)
    logger.error(error.stack)
    return false
  }
}

/**
 * Fecha a conexão com o banco de dados
 * @returns {Promise<void>}
 */
const closeConnection = async () => {
  try {
    await sequelize.close()
    logger.info("🔒 Conexão com o banco de dados fechada com sucesso.")
  } catch (error) {
    logger.error(`❌ Erro ao fechar conexão com o banco de dados: ${error.message}`)
    logger.error(error.stack)
  }
}

module.exports = {
  sequelize,
  testConnection,
  closeConnection,
}
