module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('car_photos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      originalname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      car_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'cars', key: 'id' }
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true, 
        defaultValue: null
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('car_photos');
  }
};
