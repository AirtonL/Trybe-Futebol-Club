import IMatchsServiceCreate from '../interfaces/IMatchsServiceCreate';
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

  getByQuery = async (query: string) => {
    const inProgress = query === 'true' ? 1 : 0;
    return this.model.findAll({
      where: { inProgress },
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
  };

  create = async (params: IMatchsServiceCreate) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = params;
    return this.model.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    });
  };

  finishMatch = async (id: number) => {
    await this.model.update({ inProgress: false }, { where: { id } });
  };
}

export default new MatchsService();
