import { Router } from 'express';
import CarController from '../controllers/CarController.js';
import loginRequired from '../middlewares/loginRequired.js';
import Validate from '../middlewares/validateSchema.js';
import CarSchema from '../schemas/CarSchema.js';

const routes = new Router();

routes.get('/find-photo', CarController.findPhoto);

routes.use(loginRequired)

routes.get('/', CarController.index);
routes.get('/:id', Validate(CarSchema.show), CarController.show);
routes.post('/', Validate(CarSchema.store), CarController.store);
routes.put('/:id', Validate(CarSchema.update), CarController.update);
routes.delete('/:id', Validate(CarSchema.delete), CarController.delete);

export default routes;