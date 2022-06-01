import chaiHttp = require('chai-http');
const shell = require('shelljs');
// import * as sinon from 'sinon';
import * as chai from 'chai';

import { Response } from 'superagent';
import { app } from '../app';
import { allMatchsMock } from './mocksMatchs';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes matchs', () => {
  let chaiHttpResponse: Response;
  beforeEach(() => {
    shell.exec('npm run db:reset');
  });

  it('verifica rota getAll matchs', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches');

    expect(chaiHttpResponse.body).to.be.deep.equal(allMatchsMock);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('verifica rota getAll matchs com inProgress=true', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true');

    const matchsTrue = allMatchsMock.filter((match) => match.id > 40)
    console.log(chaiHttpResponse.body);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchsTrue);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

//   it('verifica se é possivel criar match só com token valido', async () => {
//     chaiHttpResponse = await chai
//       .request(app)
//       .get('/matches')
//       .
//   });
it('verifica se finaliza uma partida', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/30/finish');

    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Finished'});
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('verifica se troca o placar de uma partida', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/30')
      .send({ awahomeTeamGoals: 40, awayTeamGoals: 10 });

    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Score changed successfully!'});
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});
