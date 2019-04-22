'use strict';
module.exports = (sequelize, DataTypes) => {

  const Message = sequelize.define('Message', {
    message: DataTypes.STRING
  }, {
    createdAt: 'dateSent',
    updatedAt: false
  });

  Message.associate = (models) => {
    Message.belongsTo(models.User,{
      foreignKey:{
        name:'senderUserId',
        allowNull: false,
      }
    });

    Message.belongsTo(models.User,{
      foreignKey:{
        name:'recieverUserId',
        allowNull: false,
      }
    });
  };

 return Message;
};