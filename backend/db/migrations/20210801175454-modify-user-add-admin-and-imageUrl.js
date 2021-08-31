'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'admin', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })

    await queryInterface.addColumn('Users', 'imageUrl', {
      type: Sequelize.STRING,
      defaultValue: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'admin', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })

    await queryInterface.removeColumn('Users', 'imageUrl', {
      type: Sequelize.STRING,
      defaultValue: false
    })

  }
};
