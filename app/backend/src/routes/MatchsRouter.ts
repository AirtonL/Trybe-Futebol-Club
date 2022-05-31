import { Router } from 'express';
import matchsController from '../controllers/MatchsController';
import TokenMiddleware from '../middlewares/TokenMiddleware';

const matchsRouter = Router();

matchsRouter.get(
  '/',
  matchsController.getAll,
);

matchsRouter.post(
  '/',
  TokenMiddleware,
  matchsController.create,
);

matchsRouter.patch(
  '/:id/finish',
  matchsController.finishMatch,
);

matchsRouter.patch(
  '/:id',
  matchsController.updateGoalsMatch,
);

export default matchsRouter;
