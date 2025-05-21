const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

/**
 * Middleware para verificar autenticação via JWT
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const authMiddleware = (req, res, next) => {
  // Obtém o token do header Authorization
  const authHeader = req.headers.authorization;

  // Verifica se o token foi fornecido
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  // O token vem no formato: "Bearer <token>"
  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Token mal formatado' });
  }

  const [scheme, token] = parts;

  // Verifica se o token começa com "Bearer"
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token mal formatado' });
  }

  // Verifica se o token é válido
  try {
    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = authMiddleware; 