import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '10d',
};

export const jwtSign = (payload: any) => jwt.sign(payload, SECRET, jwtConfig);

export const jwtVerify = (token:string) => jwt.verify(token, SECRET);
