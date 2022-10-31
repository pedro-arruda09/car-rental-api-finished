import CarPhotoModel from '../models/CarPhotoModel.js';
import CarModel from '../models/CarModel.js';

class CarPhotoService {

    index(data) {
        return CarPhotoModel.findAll(data);
    }

    async store(data) {
        await CarPhotoModel.create(data)
    }

    async updateCars({ id, car_id }) {
        const carPhoto = await CarPhotoModel.findOne({
            where: {
                id: id,
            },
            raw: true
        });
        
        const image_id = carPhoto.id;

        return CarModel.update({
            image_id: image_id,
        }, {
            where: {
                id: car_id
            }
        });
    }

    async delete(filter) {
        return CarPhotoModel.destroy(filter);
    }
}

export default new CarPhotoService();