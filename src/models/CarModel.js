const { Model, DataTypes } = require('sequelize');

class Car extends Model {
    static init(sequelize) {
        super.init({
            model: { type: DataTypes.STRING },
            year: {
                type: DataTypes.INTEGER,
                defaultValue: '',
            },
            chassi: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            image_id: {
                type: DataTypes.INTEGER,
                defaultValue: ''
            },
            daily_price: {
                type: DataTypes.FLOAT,
                defaultValue: ''
            }
        }, {
            sequelize,
            paranoid: true,
        })
    }
    static associate(models) {
        this.belongsTo(models.Admin, { foreignKey: 'admin_id', as: 'admin' });
    }
}

module.exports = Car;