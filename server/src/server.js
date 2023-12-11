import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { initDB } from './utils/initDB.js';
import { getUserInfo, login, register } from './controllers/UserController.js';
import { authValidator } from './helpers/validators.js';
import handleValidationError from './middlewares/handleValidationError.js';
import isAuthenticated from './middlewares/isAuthenticated.js';

dotenv.config();

export const createServer = () => {
  const app = express();

  initDB();

  app.use(express.json());
  app.use(cors());

  app.post('/register', authValidator, handleValidationError, register);
  app.post('/login', authValidator, handleValidationError, login);
  app.get('/me', isAuthenticated, getUserInfo);

  app.use('/', (_, res) => {
    res.send('Server is running');
  });

  return app;
}
