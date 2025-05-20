const { DataTypes } = require('sequelize');

/**
 * Define o modelo Iniciativa
 * @param {Object} sequelize - Instância do Sequelize
 * @returns {Object} Modelo Iniciativa
 */
module.exports = (sequelize) => {
  const Iniciativa = sequelize.define('Iniciativa', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'O título da iniciativa é obrigatório'
        }
      }
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    categoria: {
      type: DataTypes.ENUM('ENERGIA', 'AGUA', 'RESIDUOS', 'ALIMENTACAO', 'TRANSPORTE', 'OUTRO'),
      allowNull: false,
      defaultValue: 'OUTRO',
      validate: {
        isIn: {
          args: [['ENERGIA', 'AGUA', 'RESIDUOS', 'ALIMENTACAO', 'TRANSPORTE', 'OUTRO']],
          msg: 'Categoria inválida'
        }
      }
    },
    dataInicio: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'data_inicio'
    },
    dataFim: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'data_fim'
    },
    status: {
      type: DataTypes.ENUM('PLANEJADA', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA'),
      allowNull: false,
      defaultValue: 'PLANEJADA',
      validate: {
        isIn: {
          args: [['PLANEJADA', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA']],
          msg: 'Status inválido'
        }
      }
    },
    comunidadeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'comunidade_id',
      references: {
        model: 'comunidades',
        key: 'id'
      }
    },
    responsavelId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'responsavel_id',
      references: {
        model: 'moradores',
        key: 'id'
      }
    }
  }, {
    tableName: 'iniciativas',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  /**
   * Define as associações do modelo Iniciativa
   * @param {Object} models - Objeto contendo todos os modelos
   */
  Iniciativa.associate = (models) => {
    // Uma iniciativa pertence a uma comunidade
    Iniciativa.belongsTo(models.Comunidade, {
      foreignKey: 'comunidade_id',
      as: 'comunidade'
    });

    // Uma iniciativa tem um morador responsável
    Iniciativa.belongsTo(models.Morador, {
      foreignKey: 'responsavel_id',
      as: 'responsavel'
    });

    // Uma iniciativa tem muitas métricas
    Iniciativa.hasMany(models.Metrica, {
      foreignKey: 'iniciativa_id',
      as: 'metricas'
    });
  };

  return Iniciativa;
};