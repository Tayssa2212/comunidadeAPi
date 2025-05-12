/**
 * Controlador para documentação da API
 */

/**
 * Redireciona para a documentação Swagger
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
const redirectToSwagger = (req, res) => {
    res.redirect("/api-docs")
  }
  
  module.exports = {
    redirectToSwagger,
  }
  