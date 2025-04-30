import express from 'express';
import userRouter from './routes/user.router.js';
import errorHandler from './middleware/errors/index.js';

const app = express();


app.use('/api/user', userRouter);

app.listen(8080, () => console.log("Listening on port 8080"));


app.use(express.json());
app.use(errorHandler);