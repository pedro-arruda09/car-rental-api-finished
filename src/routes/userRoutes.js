const express = require('express');
const UserController = require('../controllers/UserController');
const loginRequired = require('../middlewares/loginRequired');
const Validate = require('../middlewares/validateSchema');
const UserSchema = require('../schemas/UserSchema');

const routes = express.Router();


routes.use(loginRequired);

routes.get('/users', UserController.index);
routes.post('/users/', Validate(UserSchema.store), UserController.store);
routes.post('/car_rent/:user_id', UserController.rent);
routes.post('/car_return/:id/', UserController.returnCar);
routes.get('/user/', Validate(UserSchema.show), UserController.show);
routes.put('/user/', Validate(UserSchema.update), UserController.update);
routes.delete('/user/', Validate(UserSchema.delete), UserController.delete);

module.exports = routes;