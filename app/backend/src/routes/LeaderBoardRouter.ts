import { Router } from 'express';
import leaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardRouter = Router();

leaderBoardRouter.get(
  '/',
  leaderBoardController.getLeaderBoardGeneral,
);

leaderBoardRouter.get(
  '/home',
  leaderBoardController.getLeaderBoard,
);

leaderBoardRouter.get(
  '/away',
  leaderBoardController.getLeaderBoardAway,
);

export default leaderBoardRouter;
