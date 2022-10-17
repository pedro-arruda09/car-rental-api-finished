const express = require('express');
const CarPhotoController = require('../controllers/CarPhotoController');
const loginRequired = require('../middlewares/loginRequired');

const routes = express.Router();

routes.use(loginRequired);

routes.get('/car-photos/', CarPhotoController.index);
routes.post('/car-photos/', CarPhotoController.store);
routes.delete('/car-photos/:id', CarPhotoController.delete);

module.exports = routes;