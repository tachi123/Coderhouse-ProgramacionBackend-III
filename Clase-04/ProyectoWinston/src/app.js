import express from 'express';
import { addLogger } from './utils/loggerEnvironment.js';

const app = express();

app.use(addLogger);

app.get('/', (req, res) => {
    req.logger.debug("Mensaje de debug");
    req.logger.info("Mensaje de información");
    req.logger.warning("Mensaje de advertencia");
    req.logger.fatal("Fatal error!");
    res.send("Prueba de logger!")
});

app.listen(8080, () => console.log("Listening"));