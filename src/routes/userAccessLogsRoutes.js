import { Router } from 'express';
import UserAccessLogsController from '../controllers/UserAccessLogsController.js';
// import loginRequired from '../middlewares/loginRequired.js';

const routes = new Router();

// routes.use(loginRequired);

routes.get('/', UserAccessLogsController.checkAccess);

export default routes;