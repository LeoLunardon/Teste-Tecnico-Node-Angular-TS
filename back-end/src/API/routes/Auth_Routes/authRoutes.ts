import express from 'express';
import authController from '../../../services/controllers/authController';

const authRouter = express.Router();

// Rota de login
authRouter.post('/login', authController.login);

export default authRouter;
