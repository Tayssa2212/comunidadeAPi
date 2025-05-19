module.exports = {
<<<<<<< HEAD
  database: {
    development: {
      url: 'postgres://usuario:senha@localhost:5432/api_comunidade', 
      dialect: 'postgres',
      logging: true,
      dialectOptions: {
        ssl: false,
      },
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
=======
    database: {
      development: {
        url: process.env.DB_URL || 'sqlite::memory:', 
        dialect: process.env.DB_DIALECT || 'sqlite',
        logging: true
      },
      test: {
        url: 'sqlite::memory:',
        dialect: 'sqlite',
        logging: false
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
>>>>>>> origin/middlewares
