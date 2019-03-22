'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListingImage = sequelize.define('ListingImage', {
    imageFile: DataTypes.BLOB
  }, {});
  ListingImage.associate = function(models) {
    ListingImage.belongsTo(models.ListingPost);
  };
  return ListingImage;
};