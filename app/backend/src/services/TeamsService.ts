import Team from '../database/models/Team';

class TeamsService {
  constructor(
    private model = Team,
  ) {}

  async getAll(): Promise<Team[]> {
    return this.model.findAll();
  }
}

export default new TeamsService();
