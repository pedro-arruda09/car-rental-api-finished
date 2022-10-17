const AdminModel = require('../models/AdminModel');

module.exports = {
    store(data) {
        console.log(data);
        return AdminModel.findOne(data)
    }
}