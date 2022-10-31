import UserModel from '../models/UserModel.js';
import CarModel from '../models/CarModel.js';

const index = async (req, res) => {

    return UserModel.findAll({
        attributes: ['name', 'id', 'email'],
        include: [{
            model: CarModel,
            where: {
                user_id: req.user_id
            },
            attributes: ['model', 'year', 'chassi'],
            as: 'car'
        }],
        where: {
            id: req.user_id
        },
        raw: true,
        nest: true
    })
};

export default {
    index
};