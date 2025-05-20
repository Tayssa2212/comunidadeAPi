function success(res, data, message = 'Requisição bem-sucedida', status = 200) {
    return res.status(status).json({
      status: 'success',
      message,
      data
    });
  }
  
  function error(res, message = 'Erro interno do servidor', status = 500, details = null) {
    return res.status(status).json({
      status: 'error',
      message,
      error: {
        code: status,
        details
      }
    });
  }
  
  module.exports = { success, error };
  