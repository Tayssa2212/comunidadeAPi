/**
 * Configurações gerais da aplicação
 */

require("dotenv").config()

module.exports = {
  app: {
    name: "Comunidade Sustentável API",
    version: "1.0.0",
    description: "API para gestão de comunidades e iniciativas sustentáveis",
  },
  server: {
    port: process.env.PORT || 3000,
    baseUrl: process.env.BASE_URL || "http://localhost:3000",
  },
  database: {
    development: {
      url: process.env.DATABASE_URL,
      dialect: "postgres",
      logging: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      define: {
        timestamps: true,
        underscored: true,
      },
    },
    test: {
      url: process.env.TEST_DATABASE_URL || process.env.DATABASE_URL,
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      define: {
        timestamps: true,
        underscored: true,
      },
    },
    production: {
      url: process.env.DATABASE_URL,
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      define: {
        timestamps: true,
        underscored: true,
      },
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || "sua_chave_secreta_padrao",
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  },
  logging: {
    level: process.env.LOG_LEVEL || "info",
    file: process.env.LOG_FILE || "./logs/app.log",
  },
}
