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
      console.log(board);
      return res.status(200).json(board);
    } catch (e) {
      next(e);
    }
  };
}

export default new LeaderBoardController();
