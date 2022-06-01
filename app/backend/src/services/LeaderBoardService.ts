import sortArray = require('sort-array');
import ITableService from '../interfaces/ITableService';
import Team from '../database/models/Team';
import LeaderBoardHelper from '../utils/LeaderBoard';

class LeaderBoardService {
  constructor(
    private teamModel = Team,
  ) {}

  static sort(table: ITableService[]) {
    const keys = ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn'];
    const sort = ['desc', 'desc', 'desc', 'desc', 'desc'];
    return sortArray(table, { by: keys, order: sort });
  }

  async leaderBoard() {
    const teams = await this.teamModel.findAll();
    const table = await LeaderBoardHelper.constructorLeaderBoard(teams, 'home');
    return LeaderBoardService.sort(table);
  }

  async leaderBoardAway() {
    const teams = await this.teamModel.findAll();
    const table = await LeaderBoardHelper.constructorLeaderBoard(teams, 'away');
    return LeaderBoardService.sort(table);
  }
}

export default new LeaderBoardService();
