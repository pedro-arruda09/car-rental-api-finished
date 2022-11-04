import CarModel from '../models/CarModel.js';
import CarPhotoModel from '../models/CarPhotoModel.js';

class CarService {
    index() {
        return CarModel.findAll({
            attributes: ['admin_id', 'id', 'model', 'year', 'chassi', 'daily_price'],
        });
    }

    store(data) {
        return CarModel.create(data);
    }

    async show(filter) {
        const car = await CarModel.findOne({
            where: filter,
        });

        if (!car) {
            throw new Error('Car does not exist.');
        }

        return car;
    }

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
    }

    async delete(filter) {
        await this.show(filter);

        return CarModel.destroy({
            where: filter
        });
    }

    showFull (id) {
        console.log(id);
        return CarPhotoModel.findOne({
            attributes: ['originalname'],
            where: {
                car_id: id
            }, 
            include: {
                model: CarModel,
                where: {
                    id: id
                },
                as: 'car'
            }
        });
    }
};

export default new CarService();