import Match from '../database/models/Match';

export const totalVictoriesFunc = (matchs: Match[]) => matchs
  .reduce((acc, cv) => (cv.homeTeamGoals > cv.awayTeamGoals ? acc + 1 : acc), 0);

export const totalDrawsFunc = (matchs: Match[]) => matchs
  .reduce((acc, cv) => (cv.homeTeamGoals === cv.awayTeamGoals ? acc + 1 : acc), 0);

export const totalLossesFunc = (matchs: Match[]) => matchs
  .reduce((acc, cv) => (cv.homeTeamGoals < cv.awayTeamGoals ? acc + 1 : acc), 0);

export const goalsFavorFunc = (matchs: Match[]) => matchs
  .reduce((acc, cv) => acc + cv.homeTeamGoals, 0);
