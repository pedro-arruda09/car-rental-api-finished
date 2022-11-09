import carService from '../services/carService.js';
import utils from '../utils/utils.js';

class CarController {
    async index(req, res) {
        try {
            const cars = await carService.index({
                // admin_id: req.filter.admin_id
            });
            return utils.handleResponse(res, cars);
        } catch (e) {
            console.log(e);
            return utils.handleError(res, 'Unable to view cars.')
        }
    }

    async store(req, res) {
        try {
            const createCar = await carService.store({
                ...req.data,
                admin_id: 3
            });

            return utils.handleResponse(res, createCar);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: e.message });
        }
    }

    async show(req, res) {
        try {
            const car = await carService.show({
                id: req.filter.id,
            });
            return utils.handleResponse(res, car);
        } catch (e) {
            return utils.handleError(res, e)
        }
    }

    async update(req, res) {
        try {
            const ID = req.data.id;
            const admin_id = req.adminId;

            await carService.update(req.data, ID, admin_id);

            return utils.handleResponse(res, { updated_car: true });
        } catch (e) {
            return utils.handleError(res, e);
        }
    }

    async delete(req, res) {
        try {
            if (!req.filter.id) {
                return res.status(400).json({
                    errors: ['ID was not sent.']
                })
            }

            await carService.delete({
                id: req.filter.id,
                admin_id: req.adminId
            });

            return utils.handleResponse(res, 'The car was deleted succesfully.');
        } catch (e) {
            console.log(e);
            return utils.handleError(res, e);
        }
    }

    async showFull(req, res) {
        try {
            const carPhoto = await carService.showFull(req.filter.id);
            return utils.handleResponse(res, carPhoto);
        } catch (e) {
            console.log(e);
            return utils.handleError(res, 'Unable to view cars.')
        }
    }

};

export default new CarController();