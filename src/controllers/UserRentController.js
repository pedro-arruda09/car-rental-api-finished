import userRentService from "../services/userRentService.js";
import utils from '../utils/utils.js';

class UserRentController {

    async index(req, res) {
        try {
            const users = await userRentService.index({
                attributes: ['id', 'daily_price', 'total_price'],
            });

            return utils.handleResponse(res, users);
        } catch (e) {
            console.log(e);
            return utils.handleError(res, 'Unable to view user rent.')
        }
    }

    async rent(req, res) {
        try {
            await userRentService.rent({
                user_id: req.userId,
                car_id: req.body.car_id,
                rent_end_at: req.body.rent_end_at,
                rent_started_at: req.body.rent_started_at,
                city: req.body.city
            });
            return res.json("Car rent made");
        } catch (e) {
            // console.log(e);
            return res.status(400).json({
                error: "This rent cannot be made",
            });
        }
    }

    async returnCar(req, res) {
        try {
            await userRentService.returnCar({
                id: req.params.id,
                car_id: req.params.car_id,
            })
            return res.json("Car return made");
        } catch (e) {
            console.log(e);
            return res.status(400).json({
                error: "This return cannot be made",
            });
        }
    }

    async userRents(req, res) {
        try {
            const userRent = await userRentService.userRents({
                user_id: req.userId
            })

            return res.json(userRent)
        } catch(e) {
            console.log(e);
        }
    }

    async availableCars (req, res) {
        try {
            const availableCars = await userRentService.availableCars({
                where: {
                    is_rented: false
                },
                raw: true
            })
            return res.json(availableCars)
        } catch(e) {
            console.log(e);
        }
    }

    async rentTotal(req, res) {
        try {
            const userRentTotal = await userRentService.rentTotal({
                id: req.params.id
            })
            console.log(userRentTotal);
            return res.json(userRentTotal)
        } catch(e) {
            console.log(req.params.id);
            console.log(e);
        }
    } 
};

export default new UserRentController();