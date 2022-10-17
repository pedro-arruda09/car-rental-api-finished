module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'cars', // table name
        'image_id', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null
        },
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('cars', 'image_id'),
    ]);
  }
};
