module.exports = {
  secret: process.env.JWT_SECRET || 'password-padrao',
  expiresIn: '24h' // Token expira em 24 horas
}; 