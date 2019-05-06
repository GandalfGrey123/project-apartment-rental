const express = require('express');
var models = require('../models');
const router = express.Router();
const app = express();


//clean up sequelize object
function clearChat(chatRoom){
  let chatObject = { 
    "userOneEmail": chatRoom.Chat.userOneEmail,
    "userTwoEmail": chatRoom.Chat.userTwoEmail,
    "messages": []
  }

  chatRoom.Chat.getMessages().then((messages) =>{
   messages.forEach(message => chatObject['messages'].push(
    {'message': message.message, 'senderEmail': message.userEmail}
   ))
   console.log(chatObject)
  })
}

function clearChats(chatRooms){
  return chatRooms.map((nextChatRoom) => clearListing(nextChatRoom));
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

      res.status(200).send(clearChats(user.UserChats))       
    });
}); 


router.post('/send', (req,res) =>{
  //console.log(req.headers);
}); 

router.post('/new', (req,res) =>{
  //console.log(req.headers);
}); 



module.exports = router;
