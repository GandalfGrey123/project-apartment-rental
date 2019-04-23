'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return(
    queryInterface.addColumn(
        'HousingTypes',
        'listingPostId',
        {
          type: Sequelize.INTEGER,
          references: {
              model: 'ListingPosts', 
              key: 'id',
          },
        }       
       ),

       queryInterface.addColumn(
        'ListingImages',
        'listingPostId',
        {
          type: Sequelize.INTEGER,
          references: {
              model: 'ListingPosts',
              key: 'id',
          },
        }       
       ),       
    )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
