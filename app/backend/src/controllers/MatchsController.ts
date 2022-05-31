import { Request, Response, NextFunction } from 'express';
import matchsService from '../services/MatchsService';

class MatchController {
  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const matchs = await matchsService.getAll();
      return res.status(200).json(matchs);
    } catch (err) {
      next(err);
    }
  };
}

export default new MatchController();
