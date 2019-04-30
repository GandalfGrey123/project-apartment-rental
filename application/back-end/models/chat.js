'use strict';
module.exports = (sequelize, DataTypes) => {

const Chat = sequelize.define('Chat', {
     
}, {
    createdAt: 'dateSent',
    updatedAt: false
  });

  Chat.associate = (models) => {

    Chat.hasMany(models.Message);
    Chat.hasOne(models.ListingPost);
    Chat.belongsTo(models.User, {foreignKey: 'user1'});    
    Chat.belongsTo(models.User, {foreignKey: 'user1'});    
  };

 return Chat;
};