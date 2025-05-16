// ..config/database.js
const { Sequelize } = require('sequelize');

// Configuração do Sequelize com SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Arquivo SQLite sera criado na raiz do projeto
});

module.exports = sequelize;