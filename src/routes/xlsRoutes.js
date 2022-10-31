import { Router } from 'express';
import xlsController from '../controllers/xlsController.js';

const routes = new Router();

routes.get('/', xlsController.index);

export default routes;