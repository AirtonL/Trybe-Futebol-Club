import Match from '../database/models/Match';
import Team from '../database/models/Team';
import {
  goalsAway,
  goalsHome,
  lossesFuncAway,
  lossesFuncHome,
  totalAway,
  totalDrawsFunc,
  totalHome,
} from './LeaderBoardFunctions';

class LeaderBoardHelper {
  constructor(
    private matchModel = Match,
  ) {}

  static async createScores(matchs: Match[], homeOrAway: string) {
    const isHome = homeOrAway === 'home';
    const totalVictories = isHome ? totalHome(matchs) : totalAway(matchs);
    const totalDraws = totalDrawsFunc(matchs);
    const totalLosses = isHome ? lossesFuncHome(matchs) : lossesFuncAway(matchs);
    const goalsFavor = isHome ? goalsHome(matchs) : goalsAway(matchs);
    const goalsOwn = isHome ? goalsAway(matchs) : goalsHome(matchs);
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

  async constructorLeaderBoard(teams: Team[], homeOrAway: string) {
    const scores = Promise.all(teams.map(async ({ id, teamName }) => {
      let matchs;
      if (homeOrAway === 'home') {
        matchs = await this.matchModel
          .findAll({ where: { homeTeam: id, inProgress: false } });
      } else {
        matchs = await this.matchModel
          .findAll({ where: { awayTeam: id, inProgress: false } });
      }
      const result = await LeaderBoardHelper.createScores(matchs, homeOrAway);

      return {
        name: teamName,
        ...result,
      };
    }));
    return scores;
  }
}

export default new LeaderBoardHelper();
