'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    sessionToken: DataTypes.STRING,
  }, {
    createdAt: false,
    updatedAt: false
  });
  User.associate = function(models) {
    User.hasMany(models.ListingPost, {
    	onDelete: 'CASCADE'
    });

    User.hasMany(models.Message);
    User.hasMany(models.Chat);
  };
  return User;
};