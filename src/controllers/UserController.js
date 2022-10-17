const userService = require('../services/userService');
const utils = require('../utils/utils')
const moment = require('moment');

module.exports = {
    async index(req, res) {
        try {
            const users = await userService.index({
                attributes: ['name', 'email']
            });

            return utils.handleResponse(res, users);
        } catch (e) {
            return utils.handleError(res, 'Unable to view users.')
        }
    },

    async store(req, res) {
        try {
            const createUser = await userService.store({
                ...req.data,
                admin_id: req.adminId
            });

            return utils.handleResponse(res, createUser);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: e.message });
        }
    },

    async show(req, res) {
        try {
            const user = await userService.show({
                ...req.filter,
                admin_id: req.adminId
            });
            return utils.handleResponse(res, user);
        } catch (e) {
            return utils.handleError(res, e)
        }
    },

    async update(req, res) {
        try {
            const changes = req.data;
            const filter = {
                id: req.filter.id,
                creator_id: req.adminId
            };

            await userService.update(filter, changes);

            return utils.handleResponse(res, changes);
        } catch (e) {
            return utils.handleError(res, e)
        }
    },

    async delete(req, res) {
        try {
            await userService.delete({
                ...req.filter,
                admin_id: req.adminId
            });

            return utils.handleResponse(res, `The user ${req.filter.id} was deleted succesfully.`);
        } catch (e) {
            return utils.handleError(res, e);
        }
    },

    async rent(req, res) {
        try {
            await userService.rent({
                user_id: req.params.user_id,
                car_id: req.body.car_id,
                rent_end_at: req.body.rent_end_at,
                daily_price: req.body.daily_price,
            });
            return res.json("Car rent made");
        } catch (e) {
            console.log(e);
            return res.status(400).json({
                error: "This rent cannot be made",
            });
        }
    },

    async returnCar(req, res) {
        try {
            await userService.returnCar({
                id: req.params.id,
                car_id: req.body.car_id,
            })
            return res.json("Car return made");
        } catch (e) {
            console.log(e);
            return res.status(400).json({
                error: "This return cannot be made",
            });
        }
    }
};