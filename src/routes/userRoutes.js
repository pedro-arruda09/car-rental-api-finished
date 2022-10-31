import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import loginRequired from '../middlewares/loginRequired.js';
import Validate from '../middlewares/validateSchema.js';
import UserSchema from '../schemas/UserSchema.js';
const routes = new Router();

routes.post('/', Validate(UserSchema.store), UserController.store);

routes.use(loginRequired);

routes.get('/', UserController.index);
routes.get('/profile', Validate(UserSchema.show), UserController.show);
routes.put('/', Validate(UserSchema.update), UserController.update);
routes.delete('/', Validate(UserSchema.delete), UserController.delete);

export default routes;