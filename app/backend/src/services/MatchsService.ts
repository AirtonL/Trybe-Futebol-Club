import Match from '../database/models/Match';
import Team from '../database/models/Team';

class MatchsService {
  constructor(
    private model = Match,
    private teamModel = Team,
  ) {}

  getAll = async (): Promise<Match[]> => this.model.findAll({
    include: [
      {
        model: this.teamModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: this.teamModel,
        as: 'teamAway',
        attributes: ['teamName'],
      },
    ],
  });
}

export default new MatchsService();
