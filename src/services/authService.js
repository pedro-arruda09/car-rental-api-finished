import UserModel from '../models/UserModel.js';

class AuthService {
    store(data) {
        console.log(data);
        return UserModel.findOne(data)
    }
}

export default new AuthService();