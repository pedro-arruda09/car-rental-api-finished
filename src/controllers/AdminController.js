const adminService = require('../services/adminService');
const utils = require('../utils/utils');

module.exports = {
    async index(req, res) {
        try {
            const admin = await adminService.index({
                attributes: ['name', 'email' ]
            });

            return utils.handleResponse(res, admin);
        } catch (e) {
            return utils.handleError(res, 'Unable to view admin.')
        }
    },

    async store(req, res) {
        try {
            const createAdmin = await adminService.store({
                ...req.data
            });

            return utils.handleResponse(res, createAdmin);
        } catch (e) {
            console.log(e);
            res.status(500).json({ "oi": "oi" });
        }
    },

    async show(req, res) {
        try {
            const admin = await adminService.show(req.adminId);

            return utils.handleResponse(res, admin);
        } catch (e) {
            return utils.handleError(res, e)
        }
    },

    async update(req, res) {
        try {
            const changes = req.data;
            const filter = {
                id: req.adminId
            };
        
            await adminService.update(filter, changes);

            return utils.handleResponse(res, changes);
        } catch(e) {
            return utils.handleError(res, e)
        }
    },

    async delete(req, res) {
        try {
            await adminService.delete({
                id: req.adminId,
            });

            return utils.handleResponse(res, `The admin ${req.adminId} was deleted succesfully.`);
        } catch (e) {
            return utils.handleError(res, e);
        }
    }
}