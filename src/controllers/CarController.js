const CarService = require('../services/carService');
const utils = require('../utils/utils')

module.exports = {
    async index(req, res) {
        try {
            const cars = await CarService.index({
                admin_id: req.adminId
            });

            return utils.handleResponse(res, cars);
        } catch (e) {
            return utils.handleError(res, 'Unable to view cars.')
        }
    },

    async store(req, res) {
        try {
            const createCar = await CarService.store({
                ...req.data,
                admin_id: req.adminId
            });

            return utils.handleResponse(res, createCar);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: e.message });
        }
    },

    async show(req, res) {
        try {
            const car = await CarService.show({
                id: req.params.id,
                admin_id: req.adminId
            });
            return utils.handleResponse(res, car);
        } catch (e) {
            return utils.handleError(res, e)
        }
    },

    async update(req, res) {
        try {
            const ID = req.data.id;
            const admin_id = req.adminId;

            await CarService.update(req.data, ID, admin_id);

            return utils.handleResponse(res, { updated_car: true });
        } catch (e) {
            return utils.handleError(res, e);
        }
    },

    async delete(req, res) {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    errors: ['ID was not sent.']
                })
            }

            await CarService.delete({
                id: req.params.id,
                admin_id: req.adminId
            });

            return utils.handleResponse(res, 'The car was deleted succesfully.');
        } catch (e) {
            console.log(e);
            return utils.handleError(res, e);
        }
    }


};