const CarPhotoModel = require('../models/CarPhotoModel');

module.exports = {

    index(data) {
        return CarPhotoModel.findAll(data);
    },

    async store(data) {
        await CarPhotoModel.create(data)
    },

    async delete(filter) {
        return CarPhotoModel.destroy(filter);
    }
}