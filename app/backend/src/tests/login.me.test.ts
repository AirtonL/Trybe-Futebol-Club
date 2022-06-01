// import * as sinon from 'sinon';
import chaiHttp = require('chai-http');
import * as chai from 'chai';
const shell = require('shelljs');

import { Response } from 'superagent';
import { app } from '../app';

import { invalidUser, validUser } from './mocksLogin';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes login', () => {
  let chaiHttpResponse: Response;
  let tokenTest: string;
  beforeEach(() => {
    shell.exec('npm run db:reset');
  });

  it('verifica se o login é efetuado com sucesso e retorna o token', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(validUser);

    const { user, token } = chaiHttpResponse.body;

    tokenTest = token;

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(token).not.to.equal(undefined);
    expect(user.role).to.be.equal('admin');
  });

  it('verifica se retorna o status 500, error', async () => {
    await chai
      .request(app)
      .post('/login')
      .on('error', async (err) => {
        expect(await err.status).to.be.equal(500);
      });
  });

  it('verifica o retorno se o login não é efetuado com sucesso', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(invalidUser);

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });

  it('verifica token invalido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', 'asd');

      const { message } = chaiHttpResponse.body;

      expect(message).to.be.equal('Invalid token');
      expect(chaiHttpResponse.status).to.be.equal(401);
  });

  it('verifica not found token', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate');

      const { message } = chaiHttpResponse.body;

      expect(message).to.be.equal('Token not found');
      expect(chaiHttpResponse.status).to.be.equal(401);
  });

  it('verifica se o token é valido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', tokenTest);

      const message = chaiHttpResponse.text;

      expect(message).to.be.equal('admin');
      expect(chaiHttpResponse.status).to.be.equal(200);
  });
});
