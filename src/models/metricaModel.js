/**
 * Modelo para Métrica
 */

const { DataTypes } = require("sequelize")

/**
 * Define o modelo Métrica
 * @param {Object} sequelize - Instância do Sequelize
 * @returns {Object} Modelo Métrica
 */
module.exports = (sequelize) => {
  const Metrica = sequelize.define(
    "Metrica",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      iniciativaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "iniciativa_id",
        references: {
          model: "iniciativas",
          key: "id",
        },
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "O tipo da métrica é obrigatório",
          },
        },
      },
      valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: {
            msg: "O valor deve ser um número decimal",
          },
        },
      },
      unidade: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "A unidade de medida é obrigatória",
          },
        },
      },
      dataRegistro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "data_registro",
      },
    },
    {
      tableName: "metricas",
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  )

  /**
   * Define as associações do modelo Métrica
   * @param {Object} models - Objeto contendo todos os modelos
   */
  Metrica.associate = (models) => {
    // Uma métrica pertence a uma iniciativa
    Metrica.belongsTo(models.Iniciativa, {
      foreignKey: "iniciativa_id",
      as: "iniciativa",
    })
  }

  return Metrica
}
