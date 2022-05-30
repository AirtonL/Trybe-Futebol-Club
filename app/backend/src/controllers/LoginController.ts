import { Request, Response, NextFunction } from 'express';
import loginService from '../services/LoginService';

class LoginController {
  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const user = await loginService.validLogin(email, password);
      if (!user) return res.status(401).json({ message: 'Incorrect email or password' });

      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  };

  tokenValidate = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { role } = req.tokenData;
      return res.status(200).send(role);
    } catch (e) {
      next(e);
    }
  };
}

export default new LoginController();
