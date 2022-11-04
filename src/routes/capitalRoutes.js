import { Router } from 'express';
import CapitalController from '../controllers/CapitalController.js';
import loginRequired from '../middlewares/loginRequired.js';
import Validate from '../middlewares/validateSchema.js';
import CapitalSchema from '../schemas/CapitalSchema.js';

const routes = new Router();

routes.get('/suggest', Validate(CapitalSchema.suggest), CapitalController.suggest);
routes.use(loginRequired)

routes.get('/', CapitalController.index);
// routes.get('/:id', Validate(CapitalSchema.show), CapitalController.show);
// routes.post('/', Validate(CapitalSchema.store), CapitalController.store);
// routes.put('/:id', Validate(CapitalSchema.update), CapitalController.update);
// routes.delete('/:id', Validate(CapitalSchema.delete), CapitalController.delete);

export default routes;