import { Router } from 'express';
import UserAccessLogsController from '../controllers/UserAccessLogsController.js';

const routes = new Router();

routes.get('/', UserAccessLogsController.checkAccess);

export default routes;