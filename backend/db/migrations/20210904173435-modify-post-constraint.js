'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Posts', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_userId',
      references: { 
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Posts',{
      name: 'fk_userId'
    })       
  }
};


