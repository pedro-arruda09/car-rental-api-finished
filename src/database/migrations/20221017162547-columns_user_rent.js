module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('user_rents', 'total_price'),
      queryInterface.removeColumn('user_rents', 'rent_returned_at'),
    ]);
  }
};
