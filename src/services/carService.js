const CarModel = require('../models/CarModel');

module.exports = {
    index() {
        return CarModel.findAll({
            attributes: ['user_id', 'id', 'model', 'year', 'chassi'],
        });
    },

    store(data) {
        return CarModel.create(data);
    },

    async show(filter) {
        const car = await CarModel.findOne({
            where: filter
        });

        if (!car) {
            throw new Error('Car does not exist.');
        }

        return car;
    },

    async update(data, id, admin_id) {
        const car = await CarModel.update(data, {
            where: { id, admin_id },
        }, {
            returning: true,
        });

        if (!car) {
            throw new Error('Car was not found.');
        }
        return car;
    },

    async delete(filter) {
        await this.show(filter);

        return CarModel.destroy({
            where: filter
        });
    }
};