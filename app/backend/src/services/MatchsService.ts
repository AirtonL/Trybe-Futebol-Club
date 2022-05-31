import Team from '../database/models/Team';
import Match from '../database/models/Match';

import IMatchsServiceCreate from '../interfaces/IMatchsServiceCreate';
import IMatchsServiceEdit from '../interfaces/IMatchsServiceEdit';

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

  findTeams = async (homeTeam: number, awayTeam: number) => {
    const home = await this.teamModel.findByPk(homeTeam);
    const away = await this.teamModel.findByPk(awayTeam);

    return { home, away };
  };

  editMatchGoals = async ({ id, homeTeamGoals, awayTeamGoals }: IMatchsServiceEdit) => {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  };
}

export default new MatchsService();
