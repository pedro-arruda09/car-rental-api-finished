module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('cars', 'user_id'),
      queryInterface.removeColumn('cars', 'test'),
    ]);
  }
};
