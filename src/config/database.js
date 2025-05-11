/**
 * Configuração de conexão com o banco de dados
 */

const { Sequelize } = require("sequelize");
const config = require("./config");
const logger = require("../utils/logger");

// Determina o ambiente atual
const env = process.env.NODE_ENV || "development";
const dbConfig = config.database[env];

// Inicializa o Sequelize com a configuração apropriada
const sequelize = new Sequelize(dbConfig.url, {
  dialect: dbConfig.dialect,
  logging: dbConfig.logging ? (msg) => logger.debug(msg) : false,
  dialectOptions: dbConfig.dialectOptions,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

/**
 * Testa a conexão com o banco de dados
 * @returns {Promise<boolean>} Retorna true se a conexão for bem-sucedida
 */
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Conexão com o banco de dados estabelecida com sucesso.");
    return true;
  } catch (error) {
    logger.error(`Erro ao conectar ao banco de dados: ${error.message}`);
    return false;
  }
};

module.exports = {
  sequelize,
  testConnection
};
