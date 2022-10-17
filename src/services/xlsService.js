const UserModel = require('../models/UserModel');
const CarModel = require('../models/CarModel');

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

module.exports = {
    index
};