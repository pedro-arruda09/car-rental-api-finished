const { Model, DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');

class Admin extends Model {
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
            password_hash: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            password: {
                type: DataTypes.VIRTUAL,
                defaultValue: '',
            },
        }, {
            sequelize,
            paranoid: true,
            tableName: 'admin'
        })

        this.addHook('beforeSave', async admin => {
            admin.password_hash = await bcryptjs.hash(admin.password, 8);
        });

        return this;
    }

    passwordIsValid(password) {
        return bcryptjs.compare(password, this.password_hash);
    }

    static associate(models) {
        this.hasMany(models.User, { foreignKey: 'admin_id', as: 'user' });
        this.hasMany(models.Car, { foreignKey: 'admin_id', as: 'car' });
    }
};

module.exports = Admin;