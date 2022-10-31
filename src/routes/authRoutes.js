import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

const routes = new Router();
 
routes.post('/', AuthController.store);

export default routes;