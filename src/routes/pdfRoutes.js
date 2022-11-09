import { Router } from 'express';
import pdfController from '../controllers/pdfController.js';
import loginRequired from '../middlewares/loginRequired.js';

const routes = new Router();

routes.use(loginRequired);

routes.get('/', pdfController.index);

export default routes;