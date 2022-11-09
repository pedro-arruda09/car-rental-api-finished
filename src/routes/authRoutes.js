import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
import Validate from '../middlewares/validateSchema.js';
import AuthSchema from '../schemas/AuthSchema.js';

const routes = new Router();
 
routes.post('/', Validate(AuthSchema.store), AuthController.store);

export default routes;