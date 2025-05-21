/**
 * Servidor principal da API de Comunidades Sustentáveis
 * Este arquivo configura e inicia o servidor Express
 */

// Importações de pacotes
const express = require("express");
const { sequelize } = require("./src/models");
const routes = require("./src/routes");
const loggerMiddleware = require("./src/middlewares/loggerMiddleware");
const corsMiddleware = require("./src/middlewares/corsMiddleware");
const errorMiddleware = require("./src/middlewares/errorMiddleware");
const swaggerSetup = require("./src/docs/swagger");
const logger = require("./src/utils/logger");

// Carrega variáveis de ambiente
require("dotenv").config();

// Inicialização do app Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(corsMiddleware); // Configuração do CORS
app.use(express.json()); // Parser para JSON
app.use(loggerMiddleware); // Logger personalizado

// Configuração do Swagger
swaggerSetup(app);

// Rotas
app.use("/api", routes);

// Rota raiz
app.get("/", (req, res) => {
  res.json({
    message: "API de Comunidades Sustentáveis",
    documentation: "/api-docs",
  });
});

// Middleware para tratamento de erros
app.use(errorMiddleware);

// Inicialização do servidor
async function startServer() {
  try {
    // Sincroniza os modelos com o banco de dados
    await sequelize.sync({ alter: process.env.NODE_ENV === "development" });
    logger.info("Banco de dados sincronizado com sucesso");

    // Inicia o servidor
    app.listen(PORT, () => {
      logger.info(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    logger.error(`Erro ao iniciar o servidor: ${error.message}`);
    process.exit(1);
  }
}

startServer();

module.exports = app; // Exporta para testes
