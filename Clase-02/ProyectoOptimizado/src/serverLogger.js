import pino from 'pino';

const logger = pino({
    level: process.env.LOG_LEVEL || 'error'
})

//Registrando logs
logger.debug("Mensaje de depuración");
logger.info("Mensaje informativo0");
logger.error("Mensaje de error");

