const Joi = require('joi');

/**
 * Cria um middleware de validação usando um schema Joi
 * @param {Object} schema - Schema de validação Joi
 * @returns {Function} Middleware de validação
 */
const validateRequest = (schema) => {
  return (req, res, next) => {
    const validationOptions = {
      abortEarly: false, // retorna todos os erros de validação
      allowUnknown: true, // permite campos desconhecidos
      stripUnknown: true // remove campos desconhecidos
    };

    const { error, value } = schema.validate(req.body, validationOptions);
    
    if (error) {
      const validationErrors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        error: 'Erro de validação',
        details: validationErrors
      });
    }

    // Substitui o req.body com os dados validados e sanitizados
    req.body = value;
    return next();
  };
};

module.exports = validateRequest; 