import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtVerify } from '../helpers/jsonWebToken/TokenGenerate';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const { data: { email, id, role } } = jwtVerify(token) as jwt.JwtPayload;

    req.tokenData = { email, id, role };
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default auth;
