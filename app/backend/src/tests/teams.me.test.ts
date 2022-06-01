import chaiHttp = require('chai-http');
import * as chai from 'chai';

import { Response } from 'superagent';
import { app } from '../app';
import { allTeams } from './mocksTeams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes Teams', () => {
  let chaiHttpResponse: Response;

  it('verifica se trás todos os teams', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/teams');

    expect(chaiHttpResponse.body).to.deep.be.equal(allTeams);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Testa rota pelo ID', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/teams/1');

    expect(chaiHttpResponse.body).to.be.deep.equal(allTeams[0]);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Quando envia um id inexistente', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/teams/null');

    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Server error' });
    expect(chaiHttpResponse.status).to.be.equal(500);
  });

});
