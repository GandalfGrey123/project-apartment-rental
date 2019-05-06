const express = require('express');
var models = require('../models');
const router = express.Router();
const app = express();

//clean up sequelize object
function clearChat(chatRoom){
  let jsonChatObject = { 
    "userOneEmail": chatRoom.Chat.userOneEmail,
    "userTwoEmail": chatRoom.Chat.userTwoEmail,
    "messages": []
  }

  chatRoom.Chat.getMessages().then((messages) =>{
   messages.forEach(message => chatObject['messages'].push(
    {'message': message.message, 'senderEmail': message.userEmail}
   ))
    return jsonChatObject;
  })
}

function clearChats(chatRooms){
  let allChats=[]
  chatRooms.map((nextChatRoom) => allChats.push(clearChat(nextChatRoom)));
  return allChats;
}


router.get('/inbox', (req,res) =>{
    models.User.findOne({
      where:{
       sessionToken:123,
      }, 
      include:[ {
        model: models.UserChat,
        include:[models.Chat]
      }]
    }).then((user) =>{
      
      //session token error
      if(!user){
        console.log('not found!')
        return;
      }

      res.status(200).json(clearChats(user.UserChats))       
    });
}); 

router.post('/send', (req,res) =>{
  //console.log(req.headers);
}); 

router.post('/new', (req,res) =>{
  //console.log(req.headers);
}); 

module.exports = router;