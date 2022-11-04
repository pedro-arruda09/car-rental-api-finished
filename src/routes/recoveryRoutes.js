import { Router } from 'express';
import RecoveryController from '../controllers/RecoveryController.js';
import loginRequired from '../middlewares/loginRequired.js';
const routes = new Router();

routes.post('/recover_password', RecoveryController.recovery);
routes.get('/validate-token-password/:token', RecoveryController.validateToken);
routes.put('/change-password/:token', RecoveryController.changePassword);

export default routes;