'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListingPost = sequelize.define('ListingPost', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    isApproved: DataTypes.BOOLEAN
  }, {});
  ListingPost.associate = function(models) {
    
    ListingPost.belongsTo(models.User);
    
    ListingPost.belongsTo(models.HousingType);

    ListingPost.hasMany(models.ListingImage, {
      onDelete: 'CASCADE'
    });

  };
  return ListingPost;
};