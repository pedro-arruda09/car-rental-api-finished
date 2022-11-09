import { Router } from 'express';
import xlsController from '../controllers/xlsController.js';
import loginRequired from '../middlewares/loginRequired.js';

const routes = new Router();

routes.use(loginRequired);

routes.get('/', xlsController.index);

export default routes;