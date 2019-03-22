'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return (
      queryInterface.changeColumn(
     'ListingPosts',
     'title',
     {
       type: Sequelize.STRING,
       allowNull: false,
     }
    ),

    queryInterface.changeColumn(
     'ListingPosts',
     'description',
     {
       type: Sequelize.TEXT,
       allowNull: false,
     }
    )
    )
   
  },

  down: (queryInterface, Sequelize) => {
   
  }
};
