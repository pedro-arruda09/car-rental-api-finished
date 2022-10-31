import { Router } from 'express';
import UserRentController from '../controllers/UserRentController.js';
import loginRequired from '../middlewares/loginRequired.js';
import Validate from '../middlewares/validateSchema.js';
import UserRentSchema from '../schemas/UserRentSchema.js';
const routes = new Router();


routes.use(loginRequired);

routes.get('/', UserRentController.index);
routes.get('/profile', UserRentController.userRents);
routes.get('/available', UserRentController.availableCars);
routes.post('/car_rent/', UserRentController.rent);
routes.post('/car_return/:id/', UserRentController.returnCar);


export default routes;