module.exports = {
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