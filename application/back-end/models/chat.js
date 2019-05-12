'use strict';
module.exports = (sequelize, DataTypes) => {

const Chat = sequelize.define('Chat', {
	userOneEmail: DataTypes.STRING,
	userTwoEmail: DataTypes.STRING,	
}, {
    createdAt: 'dateSent',
    updatedAt: false
  });

  Chat.associate = (models) => {          
    Chat.hasMany(models.Message);
    Chat.belongsTo(models.ListingPost);
  };
 return Chat;
};