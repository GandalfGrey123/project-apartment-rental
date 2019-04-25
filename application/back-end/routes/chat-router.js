const express = require('express');
var models = require('../models');
const router = express.Router();
const app = express();

router.post('/new', (req,res) =>{
	models.Message.create({
		message: req.body.message,
		senderUserId: req.body.senderId,
	    recieverUserId: req.body.recieverId,
	}).then((newMessage) => {
		res.json(newMessage);
	});
});

router.get('/inbox', (req,res) =>{
	models.Message.findAll({
		include: models.User,
		where: {'senderUserId': req.body.id },
	}).then((result) =>{
		res.json(result);
	});
});


// a better get inbox query

//router.get('/getMyInbox',(req,res)=>{
//	
//	models.User.findOne({
//		where:{id: req.body.userId},
//		include:[ models.Message]
//	}).then((user) => {
//		// find all messages from this user
//	});
//});


module.exports = router;
