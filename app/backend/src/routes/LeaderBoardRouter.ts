import { Router } from 'express';
import leaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardRouter = Router();

leaderBoardRouter.get(
  '/home',
  leaderBoardController.getLeaderBoard,
);

export default leaderBoardRouter;
