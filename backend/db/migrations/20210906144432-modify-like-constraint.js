'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.removeConstraint('Likes', 'likes_ibfk_1');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Likes', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'likes_ibfk_1',
      references: { 
        table: ['users'],
        field: 'id'
      }, 
    });
  }
};
