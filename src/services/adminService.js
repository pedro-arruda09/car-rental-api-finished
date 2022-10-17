const AdminModel = require('../models/AdminModel');

module.exports = {
    index(data) {
        return AdminModel.findAll(data);
    },

    store(data) {
        return AdminModel.create(data);
    },

    async show(filter) {
        const admin = await AdminModel.findOne({
            where: filter
        });

        if (!admin) {
            throw new Error('Admin does not exist.');
        }

        return admin;
    },

    async update(filter, changes) {
        return AdminModel.update(changes, {
            where: filter,
            individualHooks: true
        });
    },

    async delete(filter) {
        await this.show(filter);

        return AdminModel.destroy({
            where: filter
        });
    }
};