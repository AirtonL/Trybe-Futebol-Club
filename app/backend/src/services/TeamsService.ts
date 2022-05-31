import Team from '../database/models/Team';

class TeamsService {
  constructor(
    private model = Team,
  ) {}

  async getAll(): Promise<Team[]> {
    return this.model.findAll();
  }

  async getById(id: number): Promise<Team | null> {
    return this.model.findOne({ where: { id } });
  }
}

export default new TeamsService();
