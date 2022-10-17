const express = require('express');
const AdminController = require('../controllers/AdminController');
const loginRequired = require('../middlewares/loginRequired');
const Validate = require('../middlewares/validateSchema');
const AdminSchema = require('../schemas/AdminSchema');

const routes = express.Router();

routes.post('/admins/', Validate(AdminSchema.store), AdminController.store);

routes.use(loginRequired);

routes.get('/admins/', AdminController.index);
routes.get('/admin/', Validate(AdminSchema.show), AdminController.show);
routes.put('/admin/', Validate(AdminSchema.update), AdminController.update);
routes.delete('/admin/', Validate(AdminSchema.delete), AdminController.delete);

module.exports = routes;