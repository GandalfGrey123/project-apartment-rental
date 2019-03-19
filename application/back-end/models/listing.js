'use strict';

module.exports = (sequelize, DataTypes) => {
  const listing = sequelize.define('listing', {
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    address: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {});
  
  listing.associate = function(models) {
    // associations can be defined here
  };

  return listing;
};