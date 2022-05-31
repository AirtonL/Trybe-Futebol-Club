import { Router } from 'express';
import loginRouter from './LoginRouter';
import matchsRouter from './MatchsRouter';
import teamsRouter from './TeamsRouter';

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

export default router;
