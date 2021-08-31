'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
 
    await queryInterface.renameColumn('Posts', 'like', 'likeNumber')
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.renameColumn('Posts','likeNumber', 'like')
  }
};
