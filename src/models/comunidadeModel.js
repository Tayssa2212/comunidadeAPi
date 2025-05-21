/**
 * Modelo para Comunidade
 */

const { DataTypes } = require("sequelize")

/**
 * Define o modelo Comunidade
 * @param {Object} sequelize - Instância do Sequelize
 * @returns {Object} Modelo Comunidade
 */
module.exports = (sequelize) => {
  const Comunidade = sequelize.define(
    "Comunidade",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "O nome da comunidade é obrigatório",
          },
        },
      },
      localizacao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "A localização da comunidade é obrigatória",
          },
        },
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dataFundacao: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: "data_fundacao",
      },
      metaSustentabilidade: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "meta_sustentabilidade",
      },
    },
    {
      tableName: "comunidades",
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  )

  /**
   * Define as associações do modelo Comunidade
   * @param {Object} models - Objeto contendo todos os modelos
   */
  Comunidade.associate = (models) => {
    // Uma comunidade tem muitos moradores
    Comunidade.hasMany(models.Morador, {
      foreignKey: "comunidade_id",
      as: "moradores",
    })

    // Uma comunidade tem muitas iniciativas
    Comunidade.hasMany(models.Iniciativa, {
      foreignKey: "comunidade_id",
      as: "iniciativas",
    })
  }

  return Comunidade
}
