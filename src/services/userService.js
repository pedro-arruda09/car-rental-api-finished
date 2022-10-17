const UserModel = require('../models/UserModel');
const CarModel = require('../models/CarModel');
const UserRentModel = require('../models/UserRentModel');
const moment = require('moment');

module.exports = {
    index(data) {
        return UserModel.findAll(data);
    },

    store(data) {
        return UserModel.create(data);
    },

    show(filter) {
        return UserModel.findOne({
            where: filter
        })
    },

    update(filter, changes) {
        return UserModel.update(changes, {
            where: filter,
        });
    },

    async delete(filter) {
        await this.show(filter);

        return UserModel.destroy({
            where: filter
        });
    },

    async rent({ user_id, car_id, rent_end_at, daily_price }) {
        
        const cars = await CarModel.count({
            where: {
                id: car_id,
            }
        });
        
        if (cars !== car_id.length) {
            throw new Error('This car is not available.');
        };
        
        const rentedCars = await UserRentModel.count({
            where: {
                car_id: car_id,
                rent_returned_at: null
            }
        });
        
        if (rentedCars) {
            throw new Error('This car was already rented');
        }
        
        const carsToRent = [];
        
        car_id.forEach(carId => {
            carsToRent.push({
                daily_price: daily_price,
                user_id: user_id,
                car_id: carId,
                rent_started_at: moment().format(),
                rent_end_at: rent_end_at
            })
        });

        console.log(carsToRent);

        return UserRentModel.bulkCreate(carsToRent);
    },

    async returnCar({ id, car_id }) {
        const totalRents = await UserRentModel.count({
            where: {
                id: id,
                car_id: car_id
            }
        });
        
        if (totalRents !== car_id.length) {
            throw new Error("This rent was already made!")
        }
        
        const user_rents = await UserRentModel.findOne({
            where: {
                id: id
            },
            attributes: ['daily_price', 'rent_started_at'],
            raw: true
        })
        
        const daily_price = user_rents.daily_price;
        const rentStartDate = moment(user_rents.rent_started_at);
        const returnDate = moment();
        const result = returnDate.diff(rentStartDate, 'hours');
        const totalPrice = (result / 24) * daily_price;
        console.log(totalPrice);

        await UserRentModel.update({
            rent_returned_at: returnDate,
            total_price: totalPrice,
            deleted_at: moment(),
        }, {
            where: {
                id: id
            }
        });

        return true;
    }
};