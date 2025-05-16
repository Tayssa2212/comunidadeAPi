const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Comunidade = require('../ComunidadeModel');

const Morador = sequelize.define('Morador', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  profissao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idComunidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Comunidade,
      key: 'id',
    },
  },
}, {
  tableName: 'Moradores',
  timestamps: false,
});

module.exports = Morador;