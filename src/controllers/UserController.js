import userService from '../services/userService.js';
import utils from '../utils/utils.js';
import moment from 'moment';

class UserController {
    async index(req, res) {
        try {
            const users = await userService.index({
                attributes: ['name', 'email']
            });

            return utils.handleResponse(res, users);
        } catch (e) {
            return utils.handleError(res, 'Unable to view users.')
        }
    }

    async store(req, res) {
        try {
            const adminId = 3;
            const createUser = await userService.store({
                ...req.data,
                admin_id: adminId
            });
            return utils.handleResponse(res, createUser);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: e.message });
        }
    }

    async show(req, res) {
        try {
            const user = await userService.show({
                id: req.userId
            });

            console.log(req.userId);

            return utils.handleResponse(res, user);
        } catch (e) {
            return utils.handleError(res, e)
        }
    }

    async update(req, res) {
        try {
            const changes = req.data;
            const filter = {
                id: req.userId,
            };

            await userService.update(filter, changes);

            console.log(req.userId);
            return utils.handleResponse(res, changes);
        } catch (e) {
            return utils.handleError(res, e)
        }
    }

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
    }
};

export default new UserController();