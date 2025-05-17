const { sequelize } = require('../config/database');
const Comunidade = require('../ComunidadeModel');
const Morador = require('../MoradorModel');

// Definido a relação: Uma Comunidade tem muitos Moradores
Comunidade.hasMany(Morador, { foreignKey: 'idComunidade' });
Morador.belongsTo(Comunidade, { foreignKey: 'idComunidade' });

// Sincroniza os modelos com o banco de dados
sequelize.sync({ force: true })
  .then(() => {
    console.log('Modelos sincronizados com o PostgreSQL.');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar os modelos:', err);
  });

module.exports = {
  sequelize,
  Comunidade,
  Morador,
};