import express from 'express';
import todoRouter from './routes/todo.js';
import { database } from './config/database.js';
import loginRouter from './routes/user.js';
import { config } from 'dotenv';

const app = express();
config({ path: './config/config.dotenv' });

database();
app.use('/api', [todoRouter, loginRouter]);
// const port = 5000;
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT} with ${process.env.NODE_ENV} mode`);
});
