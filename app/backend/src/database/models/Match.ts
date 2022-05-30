import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'Match',
  tableName: 'matches',
});

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'matchesHome' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'matchesAway' });

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
