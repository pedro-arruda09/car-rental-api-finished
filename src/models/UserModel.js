import { Model, DataTypes } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            email: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            cpf: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            password_hash: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            password: {
                type: DataTypes.VIRTUAL,
                defaultValue: '',
            },
            password_reset_token: {
                type: DataTypes.STRING,
                defaultValue: null,
            },
            password_reset_expires: {
                type: DataTypes.DATE,
                defaultValue: null,
            },
            is_blocked: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            }
        }, {
            sequelize,
            paranoid: true,
        })

        this.addHook('beforeSave', async user => {
            user.password_hash = await bcryptjs.hash(user.password, 8);
        });

        return this;
    }

    passwordIsValid(password) {
        return bcryptjs.compare(password, this.password_hash);
    }

    static associate(models) {
        this.belongsTo(models.Admin, { foreignKey: 'admin_id', as: 'admin' });
    }
};