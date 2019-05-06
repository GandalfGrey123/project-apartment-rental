'use strict';
module.exports = (sequelize, DataTypes) => {

const UserChat = sequelize.define('UserChat', {
     
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