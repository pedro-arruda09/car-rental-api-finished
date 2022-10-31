import { Model, DataTypes } from 'sequelize';

export default class Capital extends Model {
    static init(sequelize) {
        super.init({
            name: { type: DataTypes.STRING },
            state: {
                type: DataTypes.STRING,
                defaultValue: '',
            }
        }, {
            sequelize,
            paranoid: true,
        })
    }
}