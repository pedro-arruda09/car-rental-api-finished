import UserRentModel from '../models/UserRentModel.js';
import UserModel from '../models/UserModel.js';
import CarModel from '../models/CarModel.js';
import moment from 'moment';

class UserRentService {
    index(data) {
        return UserRentModel.findAll(data);
    }

    async rent({ user_id, car_id, rent_started_at, rent_end_at }) {
        const cars = await CarModel.count({
            where: {
                id: car_id,
            }
        });

        if (cars !== car_id.length) {
            throw new Error('This car is not available.');
        };

        const carDailyPrice = await CarModel.findOne({
            where: {
                id: car_id
            },
            raw: true
        });

        const dailyPrice = carDailyPrice.daily_price

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
                daily_price: dailyPrice,
                user_id: user_id,
                car_id: carId,
                rent_started_at: rent_started_at,
                rent_end_at: rent_end_at
            })
        });

        await CarModel.update({
            is_rented: true 
        }, {
            where: {
                id: car_id
            }
        })

        return UserRentModel.bulkCreate(carsToRent)
    }

    async returnCar({ id, car_id }) {
        const totalRents = await UserRentModel.count({
            where: {
                id: id,
                car_id: car_id
            }
        });
        console.log(totalRents);

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

        await CarModel.update({
            is_rented: false
        }, {
            where: {
                id: car_id
            }
        })

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

    userRents({ user_id }) {
        return UserRentModel.findAll({
            include: [{
                model: UserModel,
                where: {
                    id: user_id
                },
                attributes: ['name'],
                as: 'user',
            }, {
                model: CarModel,
                attributes: ['model', 'year', 'daily_price'],
                as: 'car'
            }],
            raw: true,
            nest: true,
            attributes: [],
        });
    }

    availableCars(data) {
        return CarModel.findAll(data);
    }
};

export default new UserRentService();