import UserModel from '../models/UserModel.js';

class UserService {
    index(data) {
        return UserModel.findAll(data);
    }

    store(data) {
        return UserModel.create(data);
    }

    show(filter) {
        return UserModel.findOne({
            where: filter
        });
    }

    update(filter, changes) {
        return UserModel.update(changes, {
            where: filter,
        });
    }

    async delete(filter) {
        await this.show(filter);

        return UserModel.destroy({
            where: filter
        });
    }
};

export default new UserService();