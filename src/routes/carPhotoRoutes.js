import { Router } from 'express';
import CarPhotoController from '../controllers/CarPhotoController.js';
import loginRequired from '../middlewares/loginRequired.js';

const routes = new Router();

routes.use(loginRequired);

routes.get('/', CarPhotoController.index);
routes.post('/', CarPhotoController.store);
routes.post('/update/:id', CarPhotoController.updateCars); 
routes.delete('/:id', CarPhotoController.delete);

export default routes;