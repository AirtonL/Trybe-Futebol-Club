import Match from '../database/models/Match';
import Team from '../database/models/Team';
import {
  goalsFavorFunc,
  totalDrawsFunc,
  totalLossesFunc,
  totalVictoriesFunc,
} from './LeaderBoardFunctions';

class LeaderBoardHelper {
  constructor(
    private matchModel = Match,
  ) {}

  static async createScores(matchs: Match[]) {
    const totalVictories = totalVictoriesFunc(matchs);
    const totalDraws = totalDrawsFunc(matchs);
    const totalLosses = totalLossesFunc(matchs);
    const goalsFavor = goalsFavorFunc(matchs);
    const goalsOwn = matchs.reduce((acc, cv) => acc + cv.awayTeamGoals, 0);
    const totalPoints = (totalVictories * 3) + totalDraws;
    const efficiency = +((totalPoints / (matchs.length * 3)) * 100).toFixed(2);

    return { totalGames: matchs.length,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      totalPoints,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency };
  }

  async constructorLeaderBoard(teams: Team[]) {
    const scores = Promise.all(teams.map(async ({ id, teamName }) => {
      const matchs = await this.matchModel
        .findAll({ where: { homeTeam: id, inProgress: false } });

      const result = await LeaderBoardHelper.createScores(matchs);

      return {
        name: teamName,
        ...result,
      };
    }));
    return scores;
  }
}

export default new LeaderBoardHelper();
