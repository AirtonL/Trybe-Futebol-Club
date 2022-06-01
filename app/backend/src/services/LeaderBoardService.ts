import sortArray = require('sort-array');
import Team from '../database/models/Team';
import LeaderBoardHelper from '../utils/LeaderBoard';

class LeaderBoardService {
  constructor(
    private teamModel = Team,
  ) {}

  async leaderBoard() {
    const teams = await this.teamModel.findAll();
    const table = await LeaderBoardHelper.constructorLeaderBoard(teams);
    const keys = ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn'];
    const sort = ['desc', 'desc', 'desc', 'desc', 'desc'];
    return sortArray(table, { by: keys, order: sort });
  }
}

export default new LeaderBoardService();
