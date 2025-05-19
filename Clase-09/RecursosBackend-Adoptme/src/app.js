import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import __dirname from './utils.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentación del poder y del saber',
      description: 'API pensada para la clase de Swagger',
      version: '1.0.0',
    },
  },
  apis:
    [path.join(__dirname,'routes/*.js')],
  // [path.join(__dirname,'docs/**/*.yaml')], // files containing annotations as above
};

const specs = swaggerJsdoc(swaggerOptions);

const app = express();
const PORT = process.env.PORT||8081;
const connection = mongoose.connect(`mongodb+srv://coderuser:Hsiu8LrVRlpeSzAI@cluster0.b6out72.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.use('/apidocs', swaggerUI.serve, swaggerUI.setup(specs));

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
