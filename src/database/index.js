const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Admin = require('../models/AdminModel');
const Car = require('../models/CarModel');
const CarPhoto = require('../models/CarPhotoModel');
const Capital = require('../models/CapitalModel');
const User = require('../models/UserModel');
const UserRent = require('../models/UserRentModel');

const Models = [Admin, Car, CarPhoto, Capital, User, UserRent];

const connection = new Sequelize(dbConfig);

Models.forEach(model => model.init(connection));
Models.forEach(model => model.associate && model.associate(connection.models));

module.exports = connection;