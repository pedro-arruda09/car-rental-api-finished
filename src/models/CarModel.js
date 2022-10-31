import { Model, DataTypes } from'sequelize';

export default class Car extends Model {
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
            },
            admin_id: {
                type: DataTypes.INTEGER,
                defaultValue: ''
            },
            is_rented: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
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