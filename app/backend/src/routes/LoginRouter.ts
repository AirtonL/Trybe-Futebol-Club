import { Router } from 'express';
import loginController from '../controllers/LoginController';
import validUserLogin from '../middlewares/LoginMiddleware';
import TokenMiddleware from '../middlewares/TokenMiddleware';

const loginRouter = Router();

loginRouter.post(
  '/',
  validUserLogin,
  loginController.login,
);

loginRouter.get(
  '/validate',
  TokenMiddleware,
  loginController.tokenValidate,
);

export default loginRouter;
