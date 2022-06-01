import { Router } from 'express';
import loginRouter from './LoginRouter';
import matchsRouter from './MatchsRouter';
import teamsRouter from './TeamsRouter';
import leaderBoardRouter from './LeaderBoardRouter';

const router = Router();

router.use(
  '/login',
  loginRouter,
);

router.use(
  '/teams',
  teamsRouter,
);

router.use(
  '/matches',
  matchsRouter,
);

router.use(
  '/leaderboard',
  leaderBoardRouter,
);

export default router;
