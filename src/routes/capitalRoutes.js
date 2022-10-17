const express = require('express');
const CapitalController = require('../controllers/CapitalController');
const loginRequired = require('../middlewares/loginRequired');
const Validate = require('../middlewares/validateSchema');
const CapitalSchema = require('../schemas/CapitalSchema');

const routes = express.Router();

routes.use(loginRequired)

routes.get('/capitals', CapitalController.index);
routes.get('/capitals/:id', Validate(CapitalSchema.show), CapitalController.show);
routes.post('/capitals/', Validate(CapitalSchema.store), CapitalController.store);
routes.get('/suggest/', CapitalController.suggest);
routes.put('/capitals/:id', Validate(CapitalSchema.update), CapitalController.update);
routes.delete('/capitals/:id', Validate(CapitalSchema.delete), CapitalController.delete);

module.exports = routes;