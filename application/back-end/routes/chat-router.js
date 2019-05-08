const express = require('express');
var models = require('../models');
const router = express.Router();
const app = express();

//clean up sequelize object , return chat
function clearChat(chatRoom){
  let jsonChatObject = { 
    "listing": chatRoom.listingId,
    "userOneEmail": chatRoom.Chat.userOneEmail,
    "userTwoEmail": chatRoom.Chat.userTwoEmail,
    "messages": []
  }

  chatRoom.Chat.Messages.forEach((message)=>{
    jsonChatObject['messages'].push({     
      'message': message.message,
      'senderEmail' : message.userEmail
    });
  })

  return jsonChatObject;
}

//fill array with chat objects
function clearChats(chatRooms){
  let allChats=[]
  
  chatRooms.map((nextChatRoom) => allChats
    .push(clearChat(nextChatRoom)));

  return allChats;
}


router.get('/inbox', (req,res) =>{

  //find User include UserChats then include Chats with Messages
    models.User.findOne({
      where:{
       //sessionToken:req.headers.sessionToken,
       sessionToken:123,
      }, 

      include:[{        

        model: models.UserChat,
  
        include:[{ 
            model: models.Chat, 
            include:[models.Message] 
        }],

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