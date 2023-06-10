const winston = require('winston');
const expressWinston = require('express-winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

const errorLogger = expressWinston.logger({
  winstonInstance: logger,
  level: 'error',
});

module.exports = {
  logger,
  errorLogger,
};