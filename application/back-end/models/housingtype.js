'use strict';
module.exports = (sequelize, DataTypes) => {
  const HousingType = sequelize.define('HousingType', {
    type: DataTypes.STRING,
    roomCount: DataTypes.INTEGER,
    bathroomCount: DataTypes.INTEGER
  }, {});
  HousingType.associate = function(models) {
    HousingType.belongsTo(models.ListingPost);
  };
  return HousingType;
};