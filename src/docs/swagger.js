/**
 * Configuração do Swagger para documentação da API
 */

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Opções de configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Comunidades Sustentáveis",
      version: "1.0.0",
      description: "API para gestão de comunidades e iniciativas sustentáveis",
      contact: {
        name: "Equipe de Desenvolvimento",
        email: "contato@comunidadesustentavel.com",
      },
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000",
        description: "Servidor de desenvolvimento",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/models/*.js"],
};

// Gera a especificação do Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);

/**
 * Configura o Swagger na aplicação Express
 * @param {Object} app - Instância do Express
 */
const swaggerSetup = (app) => {
  // Rota para a documentação Swagger
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
  // Rota para obter a especificação Swagger em formato JSON
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerDocs);
  });
};

module.exports = swaggerSetup;
