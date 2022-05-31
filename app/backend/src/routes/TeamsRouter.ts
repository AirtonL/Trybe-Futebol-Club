import { Router } from 'express';
import teamsController from '../controllers/TeamsController';

const teamsRouter = Router();

teamsRouter.get(
  '/',
  teamsController.getAll,
);

teamsRouter.get(
  '/:id',
  teamsController.getById,
);

export default teamsRouter;
