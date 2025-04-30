import winston from 'winston';

const devLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: 'verbose' })
  ]
});