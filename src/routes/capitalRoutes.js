import { Router } from 'express';
import CapitalController from '../controllers/CapitalController.js';
import loginRequired from '../middlewares/loginRequired.js';
// import Validate from '../middlewares/validateSchema.js';
import CapitalSchema from '../schemas/CapitalSchema.js';

const routes = new Router();

routes.use(loginRequired)

routes.get('/', CapitalController.index);
// routes.get('/:id', Validate(CapitalSchema.show), CapitalController.show);
// routes.post('/', Validate(CapitalSchema.store), CapitalController.store);
routes.get('/suggest/', CapitalController.suggest);
// routes.put('/:id', Validate(CapitalSchema.update), CapitalController.update);
// routes.delete('/:id', Validate(CapitalSchema.delete), CapitalController.delete);

export default routes;