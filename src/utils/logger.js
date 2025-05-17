/**
 * Utilitário para registro de logs na aplicação
 * Configuração do sistema de logs usando winston
 */

const winston = require('winston');
const { format, transports } = winston;

// Formato personalizado para os logs
const logFormat = format.printf(({ level, message, timestamp, ...meta }) => {
  return `[${level.toUpperCase()}] ${timestamp} - ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
});

// Configuração do logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    logFormat
  ),
  defaultMeta: { service: 'api' },
  transports: [
    // Console para todos os ambientes
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
      )
    }),
    
    // Arquivo de logs para erros
    new transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    
    // Arquivo de logs para todas as mensagens
    new transports.File({ 
      filename: 'logs/combined.log' 
    })
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'logs/exceptions.log' })
  ]
});

// Se não estamos em produção, também adicionamos um transporte colorido para console
if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logs detalhados habilitados no ambiente de desenvolvimento');
}

module.exports = logger;
