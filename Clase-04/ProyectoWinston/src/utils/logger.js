import winston from 'winston';

const customLevelOptions =  {
    levels: {
      fatal: 0,
      error: 1,
      warning: 2,
      info: 3,
      debug: 4
    },
    colors: {
      fatal: 'red',
      error: 'orange',
      warning: 'yellow',
      info: 'blue',
      debug: 'white'
    }
};

winston.addColors(customLevelOptions.colors);

const logger = winston.createLogger({
    /**
     * A partir de windost.createLogger craemos nuestro logger con los transportes que necesitamos
     */
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({ 
            level: "info", //Nivel mínimo para mostrar en consola
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }), // Aplica colores
                winston.format.simple() // Formato simple
            )
        }),
        new winston.transports.File({ 
            filename: 'errors.log',
            level: "warning", 
            format: winston.format.simple() 
        })
    ]
})


/**
 * A partir de un middleware, vamos a colocar el objeto req en el logger
 * Ademas, acá vamos a aprovechar a hacer nuestro primer log
 */

export const addLogger = (req, res, next) => {

    /** 
     * Así es un ejemplo de cómo configuramos el logger según el environment seteado
     * const environment = process.env.NODE_ENV || 'development';
     * req.logger = environment === 'production' ? prodLogger : devLogger;
     * 
    */
    

    req.logger = logger;
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next();
}