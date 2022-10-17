const { Model, DataTypes } = require('sequelize');

class UserRent extends Model {
    static init(sequelize) {
        super.init(
            {
                rent_started_at: DataTypes.DATEONLY,
                rent_end_at: DataTypes.DATEONLY,
                rent_returned_at: DataTypes.DATEONLY,
                deleted_at: DataTypes.DATE,
                daily_price: DataTypes.FLOAT,
                total_price: DataTypes.FLOAT
            }, {
            sequelize,
            paranoid: true,
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.Car, { foreignKey: 'car_id', as: 'car' });
    }
}

module.exports = UserRent;