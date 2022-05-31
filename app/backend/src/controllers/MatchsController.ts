import { Request, Response, NextFunction } from 'express';
import matchsService from '../services/MatchsService';

class MatchController {
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { inProgress } = req.query;
    try {
      if (inProgress) {
        const query = await matchsService.getByQuery(inProgress as string);
        return res.status(200).json(query);
      }

      const matchs = await matchsService.getAll();
      return res.status(200).json(matchs);
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await matchsService.create(req.body);
      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };
}

export default new MatchController();
