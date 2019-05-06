'use strict';
module.exports = (sequelize, DataTypes) => {

const Chat = sequelize.define('Chat', {
}, {
    createdAt: 'dateSent',
    updatedAt: false
  });

  Chat.associate = (models) => {          
    Chat.hasMany(models.Message);
  };

 return Chat;
};