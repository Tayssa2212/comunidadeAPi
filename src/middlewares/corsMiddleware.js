/**
 * Middleware para configuração do CORS
 * Permite o acesso à API a partir de diferentes origens
 */

const cors = require("cors");

// Configuração do CORS
const corsOptions = {
  origin: "*", // Permite acesso de qualquer origem
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "X-Total-Count"],
  credentials: true,
  maxAge: 86400 // Cache de preflight por 24 horas
};

// Exporta o middleware configurado
module.exports = cors(corsOptions);
