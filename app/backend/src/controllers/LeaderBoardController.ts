import { Request, Response, NextFunction } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

class LeaderBoardController {
  getLeaderBoard = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const board = await LeaderBoardService.leaderBoard();
      return res.status(200).json(board);
    } catch (e) {
      next(e);
    }
  };

  getLeaderBoardAway = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const board = await LeaderBoardService.leaderBoardAway();
      return res.status(200).json(board);
    } catch (e) {
      next(e);
    }
  };

  getLeaderBoardGeneral = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const away = await LeaderBoardService.leaderBoardAway();
      const home = await LeaderBoardService.leaderBoard();
      const general = LeaderBoardService.leaderBoardGeneral(away, home);
      return res.status(200).json(general);
    } catch (e) {
      next(e);
    }
  };
}

export default new LeaderBoardController();
