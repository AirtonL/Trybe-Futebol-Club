import { Request, Response, NextFunction } from 'express';
import teamsService from '../services/TeamsService';

class ClubsController {
  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await teamsService.getAll();
      return res.status(200).json(teams);
    } catch (e) {
      next(e);
    }
  };
}

export default new ClubsController();
