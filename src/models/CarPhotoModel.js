import { Model, DataTypes } from 'sequelize';

export default class CarPhoto extends Model {
    static init(sequelize) {
        super.init({
            originalname: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            filename: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
        }, {
            sequelize,
            paranoid: true,
        });
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Car, { foreignKey: 'car_id', as: 'car' });
    }
}
