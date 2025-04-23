import express from 'express';
import userRouter from './routes/user.router.js';

const app = express();
const PORT = 8080;

app.use('/api/user', userRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));