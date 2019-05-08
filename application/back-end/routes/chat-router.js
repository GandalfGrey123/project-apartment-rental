const express = require('express');
var models = require('../models');
const router = express.Router();
const app = express();

//clean up sequelize object , return chat
function clearChat(chatRoom){
  let jsonChatObject = { 
    "chatId": chatRoom.Chat.id,
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
       sessionToken:req.headers.sessiontoken,
       //sessionToken:123,
      }, 

      include:[{        

        model: models.UserChat,
  
        include:[{ 
            model: models.Chat, 
            include:[models.Message] 
        }],
      }]

    }).then((user) =>{
          
      if(!user){
        console.log('not found!')
        // session token error , 
        // user not found send unauthorized status response
       res.status(401).json(chatObj)       
      }       

      let chatObj={
       'userEmail':user.email,
       'inbox': clearChats(user.UserChats)
      }
    
       res.status(200).json(chatObj)       
    });
}); 

router.post('/send', (req,res) =>{

    models.User.findOne({
      where:{
        sessionToken: req.headers.sessiontoken,
      }
    }).then((user)=>{

      if(!user){
        console.log('not found!')
        // session token error , 
        // user not found send unauthorized status response
       res.status(401).json('error')       
      }   

      models.Message.create({
        userEmail:user.email,
        message:req.body.messagePacket.message,
        ChatId: req.body.messagePacket.chatId,
        UserId: user.id,
      });  
      res.status(200).send()
    })

}); 

router.post('/new', (req,res) =>{
   
}); 

module.exports = router;