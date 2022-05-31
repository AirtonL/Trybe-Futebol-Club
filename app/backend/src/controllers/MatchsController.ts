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
    const { homeTeam, awayTeam } = req.body;
    try {
      if (homeTeam === awayTeam) {
        return res.status(401)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }

      const { home, away } = await matchsService.findTeams(homeTeam, awayTeam);
      if (!home || !away) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }

      const result = await matchsService.create(req.body);
      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  finishMatch = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      await matchsService.finishMatch(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (err) {
      next(err);
    }
  };
}

export default new MatchController();
