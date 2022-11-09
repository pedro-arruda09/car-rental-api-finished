import { Router } from 'express';
import UserRentController from '../controllers/UserRentController.js';
import loginRequired from '../middlewares/loginRequired.js';
import Validate from '../middlewares/validateSchema.js';
import UserRentSchema from '../schemas/UserRentSchema.js';
const routes = new Router();


routes.get('/available', UserRentController.availableCars);
routes.use(loginRequired);

routes.post('/car_rent/', Validate(UserRentSchema.rent), UserRentController.rent);
routes.get('/total/:id', Validate(UserRentSchema.rentTotal), UserRentController.rentTotal);
routes.post('/car_return/:id/:car_id', Validate(UserRentSchema.returnCar), UserRentController.returnCar);
routes.get('/', UserRentController.index);
routes.get('/profile', UserRentController.userRents);


export default routes;