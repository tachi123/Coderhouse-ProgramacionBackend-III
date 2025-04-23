import express from 'express';
import config from './config/config.js';

const port = config.port;

const app = express();

app.listen(port, () => console.log("Servidor ejecutandose en el puerto: "+port))