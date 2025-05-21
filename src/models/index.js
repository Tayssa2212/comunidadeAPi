/**
 * Arquivo de inicialização dos modelos Sequelize
 * Configura e exporta todos os modelos da aplicação
 */

const { sequelize, testConnection } = require("../config/database")
const Comunidade = require("./comunidadeModel")
const Morador = require("./moradorModel")
const Iniciativa = require("./iniciativaModel")
const Metrica = require("./metricaModel")

// Inicializa os modelos
const models = {
  Comunidade: Comunidade(sequelize),
  Morador: Morador(sequelize),
  Iniciativa: Iniciativa(sequelize),
  Metrica: Metrica(sequelize),
}

// Define as associações entre os modelos
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

module.exports = {
  sequelize,
  testConnection,
  ...models,
}
