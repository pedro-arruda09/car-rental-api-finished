import { Router } from 'express';
import AdminController from '../controllers/AdminController.js';
import loginRequired from '../middlewares/loginRequired.js';
import Validate from '../middlewares/validateSchema.js';
import AdminSchema from '../schemas/AdminSchema.js';

const routes = new Router();

routes.post('/admins/', Validate(AdminSchema.store), AdminController.store);

routes.use(loginRequired);

routes.get('/', AdminController.index);
routes.get('/:id', Validate(AdminSchema.show), AdminController.show);
routes.put('/', Validate(AdminSchema.update), AdminController.update);
routes.delete('/', Validate(AdminSchema.delete), AdminController.delete);

export default routes;