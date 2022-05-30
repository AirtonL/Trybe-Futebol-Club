import { DataTypes, Model } from 'sequelize';
import db from '.';

class Team extends Model {
  public id: number;

  public teamName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'Team',
  tableName: 'teams',
});

export default Team;
