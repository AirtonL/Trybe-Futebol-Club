import { Router } from 'express';
import matchsController from '../controllers/MatchsController';

const matchsRouter = Router();

matchsRouter.get(
  '/',
  matchsController.getAll,
);

export default matchsRouter;
