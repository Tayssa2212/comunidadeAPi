const sequelize = require('../config/database');
const Comunidade = require('../ComunidadeModel');
const Morador = require('../MoradorModel');

// Aqui define a relacao: Uma Comunidade tem muitos Moradores
Comunidade.hasMany(Morador, { foreignKey: 'idComunidade' });
Morador.belongsTo(Comunidade, { foreignKey: 'idComunidade' });

// Atencao: Sincronizar os modelos com o banco de dados
sequelize.sync({ force: true }) // force: true "depois alterar esta parte"
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar os modelos:', err);
  });

module.exports = {
  sequelize,
  Comunidade,
  Morador,
};