module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'admin', // table name
        'deleted_at', // new field name
        {
          type: Sequelize.DATE,
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