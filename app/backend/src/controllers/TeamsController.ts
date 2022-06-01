import { Request, Response, NextFunction } from 'express';
import teamsService from '../services/TeamsService';

class TeamsController {
  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await teamsService.getAll();
      return res.status(200).json(teams);
    } catch (e) {
      next(e);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const team = await teamsService.getById(Number(id));
      if (!team) return res.status(404).json({ message: 'Team not found' });
      return res.status(200).json(team);
    } catch (e) {
      next(e);
    }
  };
}

export default new TeamsController();
