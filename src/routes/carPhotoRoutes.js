import { Router } from 'express';
import CarPhotoController from '../controllers/CarPhotoController.js';
import loginRequired from '../middlewares/loginRequired.js';
import Validate from '../middlewares/validateSchema.js';
import CarPhotoSchema from '../schemas/CarPhotoSchema.js';

const routes = new Router();

routes.use(loginRequired);

routes.get('/', CarPhotoController.index);
routes.post('/', Validate(CarPhotoSchema.store), CarPhotoController.store);
routes.post('/update/:id', Validate(CarPhotoSchema.updateCars), CarPhotoController.updateCars); 
routes.delete('/:id', Validate(CarPhotoSchema.delete), CarPhotoController.delete);

export default routes;