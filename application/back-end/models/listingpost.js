'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListingPost = sequelize.define('ListingPost', {
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    zip: DataTypes.INTEGER
  }, {});
  ListingPost.associate = function(models) {
    
    ListingPost.belongsTo(models.User);
    
    ListingPost.hasOne( models.HousingType, {
      onDelete: 'CASCADE'
    });

    ListingPost.hasMany(models.ListingImage, {
      onDelete: 'CASCADE'
    });

  };
  return ListingPost;
};