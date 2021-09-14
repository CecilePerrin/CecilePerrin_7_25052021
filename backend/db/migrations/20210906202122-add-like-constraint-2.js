'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Likes', {
      fields: ['postId'],
      type: 'foreign key',
      name: 'likes_ibfk_2',
      references: { 
        table: 'posts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Likes')
  }
};
