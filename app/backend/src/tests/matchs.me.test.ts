import chaiHttp = require('chai-http');
import * as chai from 'chai';
import * as sinon from 'sinon';

import { Response } from 'superagent';
import { app } from '../app';
import { allMatchsMock, newMatch } from './mocks/mocksMatchs';
import Match from '../database/models/Match';
import User from '../database/models/User';
import { mockUser, validUser } from './mocks/mocksLogin';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes matchs', () => {
  let chaiHttpResponse: Response;

  describe('verifica rota /matches GET' , () => {
    before(async () => {
      sinon
        .stub(Match, 'findAll')
        .resolves(allMatchsMock as unknown as Match[]);
    });

    after(()=> {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('verifica getAll matchs', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches');

      expect(chaiHttpResponse.body).to.be.deep.equal(allMatchsMock);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });
  
  describe('verifica quando a query for true', () => {

    before(async () => {
      const filteredMock = allMatchsMock
      .filter((match) => match.id > 40 as unknown as Match[]);
      sinon
        .stub(Match, 'findAll')
        .resolves(filteredMock as unknown as Match[]);
    });

    after(()=> {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('verifica rota getAll matchs com inProgress=true', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true');
  
      const matchsTrue = allMatchsMock.filter((match) => match.id > 40)

      expect(chaiHttpResponse.body).to.be.deep.equal(matchsTrue);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('verifica rota Post Match', () => {
    before(async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(mockUser as User);

      sinon
        .stub(Match, 'create')
        .resolves(newMatch as unknown as Match);
      });

      after(()=> {
        (User.findOne as sinon.SinonStub).restore();
        (Match.create as sinon.SinonStub).restore();
      });

      it('verifica se é possivel criar match só com token valido', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(validUser);
        const { token } = chaiHttpResponse.body;

        chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set('authorization', token)
          .send(newMatch);
        
        expect(chaiHttpResponse.body).to.deep.be.equal(newMatch);
        expect(chaiHttpResponse.status).to.have.equal(201);
    });
  });

  describe('verifica rota matches/:id/finish PATCH', () => {
    before(async () => {
      sinon
        .stub(Match, 'update')
        .resolves();
      });

    after(()=> {
      (Match.update as sinon.SinonStub).restore();
    });

    it('verifica se finaliza uma partida', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/30/finish');
  
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Finished'});
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('verifica rota matches/:id se é possivel alterar o placar da partida', () => {
    before(async () => {
      sinon
        .stub(Match, 'update')
        .resolves();
      });

    after(()=> {
      (Match.update as sinon.SinonStub).restore();
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

});
