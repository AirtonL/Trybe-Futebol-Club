import Match from '../database/models/Match';
import Team from '../database/models/Team';
import LeaderBoardHelper from '../utils/LeaderBoard';

class LeaderBoardService {
  constructor(
    private teamModel = Team,
    private matchModel = Match,
  ) {}

  async leaderBoard() {
    const teams = await this.teamModel.findAll();
    const table = await LeaderBoardHelper.constructorLeaderBoard(teams);
    return table.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;

      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;

      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;

      if (a.goalsOwn < b.goalsOwn) return -1;
      if (a.goalsOwn > b.goalsOwn) return 1;

      return 0;
    });
  }
}

export default new LeaderBoardService();
