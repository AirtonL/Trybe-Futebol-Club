import { Router } from 'express';
import teamsController from '../controllers/TeamsController';

const teamsRouter = Router();

teamsRouter.get(
  '/',
  teamsController.getAll,
);

export default teamsRouter;
