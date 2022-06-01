// import * as sinon from 'sinon';
const shell = require('shelljs');
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import { leaderBoardHome } from './mockLeaderBoard';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes leaderboard', () => {
  let chaiHttpResponse: Response;
  beforeEach(() => {
    shell.exec('npm run db:reset');
  });

  it('verifica se trás o leaderboard na ordem certa e com os dados corretos', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home');

    expect(chaiHttpResponse.body).to.be.deep.equal(leaderBoardHome);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});
