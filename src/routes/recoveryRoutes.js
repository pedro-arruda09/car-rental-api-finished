import { Router } from 'express';
import RecoveryController from '../controllers/RecoveryController.js';
import Validate from '../middlewares/validateSchema.js';
import RecoverySchema from '../schemas/RecoverySchema.js'
const routes = new Router();

routes.post('/recover_password', Validate(RecoverySchema.recovery), RecoveryController.recovery);
routes.get('/validate-token-password/:token', Validate(RecoverySchema.token), RecoveryController.validateToken);
routes.put('/change-password/:token', Validate(RecoverySchema.change), RecoveryController.changePassword);

export default routes;