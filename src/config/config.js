module.exports = {
  database: {
    development: {
      url: process.env.DB_URL || 'postgres://usuario:senha@localhost:5432/api_comunidade',
      dialect: process.env.DB_DIALECT || 'postgres',
      logging: true,
      dialectOptions: {
        ssl: false,
      },
    },
    test: {
      url: 'sqlite::memory:',
      dialect: 'sqlite',
      logging: false,
    },
    production: {
      url: process.env.DATABASE_URL,
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    },
  },
};
