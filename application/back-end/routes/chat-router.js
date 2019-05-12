const express = require('express');
var models = require('../models');
const router = express.Router();
const app = express();

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//extract info from sequelize object , return chat object
function clearChat(chatRoom,yourEmail){
  let chatingWith = chatRoom.Chat.userTwoEmail === yourEmail? chatRoom.Chat.userOneEmail : chatRoom.Chat.userTwoEmail

  let chatObj = { 
    "chatId": chatRoom.Chat.id,
    "listingTitle": chatRoom.Chat.ListingPost.title,
    "chatingWith": chatingWith,
    "messages": []
  }

  chatRoom.Chat.Messages.forEach((message)=>{
    chatObj['messages'].push({         
      'message': message.message,
      'senderEmail' : message.userEmail
    });
  })

 return chatObj;
}

//go through each UserChat and get data to create chat object
//fill array with chat objects
function clearUserChats(user){
  let allChats=[]
  
  user.UserChats.map((nextChatRoom) => allChats
    .push(clearChat(nextChatRoom,user.email))
  );

 return allChats;
}


router.get('/inbox', (req,res) =>{  
   const token = req.headers.session;  
    models.User.findOne({
      where:{
       sessionToken: token,
      }, 

      include:[{        
        model: models.UserChat,  
        include:[{ 
            model: models.Chat, 
            include:[models.Message, models.ListingPost] 
        }],
      }]

    }).then((user) =>{
          
      if(!user){
       res.status(401).json('error')
       return       
      }       

      if(user.UserChats.length == 0){
       res.status(200).json('no messages')
       return
      }

     let chatObj={
      'userEmail':user.email,
      'inbox': clearUserChats(user)
     }
    
      res.status(200).json(chatObj)       
    });
}); 

router.post('/send', (req,res) =>{
    models.User.findOne({
      where:{
        sessionToken: req.headers.session,
      }
    }).then((user)=>{

      if(!user){              
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
 const token = req.headers.session;
     
  models.User.findOne({
     where:{sessionToken: token},          
  }).then( (user)=>{


    if(!user){
      res.status(401).json('error')
    return       
    } 

    models.ListingPost.findOne({
      
      where:{ id: req.listingId },
      include:[{ model: models.User }]

    }).then((listing)=>{


        if(!listing){
          res.status(204).json('error')
        return       
        } 
   
      models.Chat.create({
        //always put the first email as the landlord's email
         userOneEmail: listing.User.email,
         userTwoEmail: user.email,
         ListingPostId: listing.id
      }).then((newChat)=>{

            models.UserChat.bulkCreate([
                 {
                  UserId: listing.User.id,
                  ChatId: newChat.id,
                 },
              
                 {
                  UserId: user.id,
                  ChatId: newChat.id,
                 },
            ]).then(()=>{
              res.status(200).send('created');
            });

      });
    }); 
 
  });
}); 

module.exports = router;

