'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Likes', 'likes_ibfk_2');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Likes', 'likes_ibfk_2');
  }
};
