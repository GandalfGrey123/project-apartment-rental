const express = require('express');
var models = require('../models');
const router = express.Router();
const app = express();

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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





//NEED TO DETERMINE - 
// .. WHICH USER IS THE LANDLORD AND WHICH IS THE STUDENT
//WE NEED TO BUILD A FORM TO MAKE A API CALL TO THIS ENDPOINT
router.post('/new', (req,res) =>{
      
      //this query needs clean up or refactor
      models.User.findAll({
         where:{
          [Op.or]: [
             {sessionToken: req.headers.sessiontoken}, 
             {email: req.body.landLordEmail},
           ]
         }
      }).then((users)=>{

          //if(!users.length !== 2){error}
          models.Chat.create({
            userOneEmail: users[0].email,
            userTwoEmail: users[1].email,
          }).then((newChat)=>{

            models.UserChat.bulkCreate([
              
              {
              // listingTitle: req.body.title, <- not included yet
               listingId: req.body.listingId,
               UserId: users[0].id,
               ChatId:newChat.id,
              },
              
              {
              // listingTitle: req.body.title, <- not included yet
               listingId: req.body.listingId,
               UserId: users[1].id,
               ChatId:newChat.id,
              }

            ]).then((chatRoom)=>{

                models.Message.create({
                    userEmail: users[0].email, // <- not sure if the sender will be users[0]
                    message: req.body.message,
                    ChatId: newChat.id,
                    UserId: users[0].id, // <- not sure if the sender will be users[0]
                }).then((message, err)=>{


                  if(err){
                    res.status(400).send('error');
                  }
                  res.status(200).send('success');

                });
            });
          });
      })
}); 

module.exports = router;