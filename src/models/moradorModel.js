/**
 * Modelo para Morador
 */

const { DataTypes } = require("sequelize")

/**
 * Define o modelo Morador
 * @param {Object} sequelize - Instância do Sequelize
 * @returns {Object} Modelo Morador
 */
module.exports = (sequelize) => {
  const Morador = sequelize.define(
    "Morador",
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
            msg: "O nome do morador é obrigatório",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "O email deve ser válido",
          },
          notEmpty: {
            msg: "O email é obrigatório",
          },
        },
      },
      telefone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dataNascimento: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: "data_nascimento",
      },
      comunidadeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "comunidade_id",
        references: {
          model: "comunidades",
          key: "id",
        },
      },
    },
    {
      tableName: "moradores",
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  )

  /**
   * Define as associações do modelo Morador
   * @param {Object} models - Objeto contendo todos os modelos
   */
  Morador.associate = (models) => {
    // Um morador pertence a uma comunidade
    Morador.belongsTo(models.Comunidade, {
      foreignKey: "comunidade_id",
      as: "comunidade",
    })

    // Um morador pode ser responsável por muitas iniciativas
    Morador.hasMany(models.Iniciativa, {
      foreignKey: "responsavel_id",
      as: "iniciativas",
    })
  }

  return Morador
}
