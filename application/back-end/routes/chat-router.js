const express = require('express');
var models = require('../models');
const router = express.Router();
const app = express();

const Op = require('sequelize').Op;

//when user goes to their DM , they get all chat objects back 
router.get('/all', (req,res) =>{
	models.User.findOne({ 
		where: {email: req.body.email},
		include: [models.Chat],
	}).then(userChats => {
  	   res.json(userChats);
    });
});


//when user makes a new DM to another User,
router.post('/new', (req,res) =>{

});


//when user sends next message in chat
router.post('/send', (req,res) =>{
   models.Chat.findOne({
     where: { id: req.body.chatId }
   }).then((chat)=>{
   	 models.Message.create({
   	 	message:req.body.message,
   	 	UserId: req.body.user1Id,
   	 	ChatId: chat.dataValues.id
   	 });

   	 res.send(chat);
   });
});

module.exports = router;
