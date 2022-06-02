import ITableService from '../interfaces/ITableService';

const constructorBoardGeneral = (awayTeam: ITableService, teamHome: ITableService) => ({
  name: awayTeam!.name,
  totalPoints: awayTeam!.totalPoints + teamHome.totalPoints,
  totalGames: awayTeam!.totalGames + teamHome.totalGames,
  totalVictories: awayTeam!.totalVictories + teamHome.totalVictories,
  totalDraws: awayTeam!.totalDraws + teamHome.totalDraws,
  totalLosses: awayTeam!.totalLosses + teamHome.totalLosses,
  goalsFavor: awayTeam!.goalsFavor + teamHome.goalsFavor,
  goalsOwn: awayTeam!.goalsOwn + teamHome.goalsOwn,
  goalsBalance: awayTeam!.goalsBalance + teamHome.goalsBalance,
  efficiency: +((awayTeam!.efficiency + teamHome.efficiency) / 2).toFixed(2),
});

export default constructorBoardGeneral;
