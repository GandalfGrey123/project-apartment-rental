'use strict';
module.exports = (sequelize, DataTypes) => {

const UserChat = sequelize.define('UserChat', {
    listingId: DataTypes.INTEGER, //each user chat conversation is linked to one listing
}, {
    createdAt: 'dateSent',
    updatedAt: false
  });

  UserChat.associate = (models) => {      
    UserChat.belongsTo(models.User);
    UserChat.belongsTo(models.Chat);    
  };
 return UserChat;
};