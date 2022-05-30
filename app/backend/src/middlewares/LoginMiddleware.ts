import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

const userLoginSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validUserLogin = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = userLoginSchema.validate(req.body);
  if (error) throw error;

  next();
};

export default validUserLogin;
