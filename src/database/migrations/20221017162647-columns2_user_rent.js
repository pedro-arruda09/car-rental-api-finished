module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'user_rents', // table name
        'total_price', // new field name
        {
          type: Sequelize.FLOAT,
          allowNull: true,
          defaultValue: null
        },
      ),
      queryInterface.addColumn(
        'user_rents', // table name
        'rent_returned_at', // new field name
        {
          type: Sequelize.DATEONLY,
          allowNull: true,
          defaultValue: null
        },
      )
    ]);
  },

  down(queryInterface, Sequelize) {
    // // logic for reverting the changes
    // return Promise.all([
    //   queryInterface.removeColumn('Users', 'linkedin'),
    //   queryInterface.removeColumn('Users', 'twitter'),
    //   queryInterface.removeColumn('Users', 'bio'),
    // ]);
  },
};