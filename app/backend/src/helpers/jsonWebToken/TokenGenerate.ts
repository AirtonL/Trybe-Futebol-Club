import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import IPayload from '../../interfaces/IPayload';

const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '10d',
};

export const jwtSign = (payload: IPayload) => jwt.sign(payload, SECRET, jwtConfig);

export const jwtVerify = (token:string) => jwt.verify(token, SECRET);
