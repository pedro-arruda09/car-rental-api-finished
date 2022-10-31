import Sequelize from 'sequelize';
import dbConfig from '../config/database.js';
import Admin from '../models/AdminModel.js';
import Car from '../models/CarModel.js';
import CarPhoto from '../models/CarPhotoModel.js';
import Capital from '../models/CapitalModel.js';
import User from '../models/UserModel.js';
import UserRent from '../models/UserRentModel.js';

const Models = [Admin, Car, CarPhoto, Capital, User, UserRent];

const connection = new Sequelize(dbConfig);

Models.forEach(model => model.init(connection));
Models.forEach(model => model.associate && model.associate(connection.models));

export default connection;