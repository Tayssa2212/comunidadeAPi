const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comunidade = sequelize.define('Comunidade', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  regiao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numeroMoradores: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  agua: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  energia: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  esgoto: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  dataCriacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'comunidades', 
  timestamps: false,
});

module.exports = Comunidade;