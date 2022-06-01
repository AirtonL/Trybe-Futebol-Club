import Match from '../database/models/Match';

export const totalHome = (matchs: Match[]) => matchs
  .reduce((acc, cv) => (cv.homeTeamGoals > cv.awayTeamGoals ? acc + 1 : acc), 0);

export const totalAway = (matchs: Match[]) => matchs
  .reduce((acc, cv) => (cv.homeTeamGoals < cv.awayTeamGoals ? acc + 1 : acc), 0);

export const totalDrawsFunc = (matchs: Match[]) => matchs
  .reduce((acc, cv) => (cv.homeTeamGoals === cv.awayTeamGoals ? acc + 1 : acc), 0);

export const lossesFuncHome = (matchs: Match[]) => matchs
  .reduce((acc, cv) => (cv.homeTeamGoals < cv.awayTeamGoals ? acc + 1 : acc), 0);

export const lossesFuncAway = (matchs: Match[]) => matchs
  .reduce((acc, cv) => (cv.homeTeamGoals > cv.awayTeamGoals ? acc + 1 : acc), 0);

export const goalsHome = (matchs: Match[]) => matchs
  .reduce((acc, cv) => acc + cv.homeTeamGoals, 0);

export const goalsAway = (matchs: Match[]) => matchs
  .reduce((acc, cv) => acc + cv.awayTeamGoals, 0);
