const express = require('express');
var models = require('../models');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


var uniqueFactor = 0;
const generateSessionToken = ()=> {
 uniqueFactor += 1;
 return Math.floor((Math.random() * 100000) + 100000)+uniqueFactor;	
};


router.post('/login',(req,res)=>{
	
  models.User.findOne({ 
    where:{
     email: req.body.email,
     password: req.body.password,
    }
  }).then((user) => {
  	if(!user){
  	 res.status(200).json({token: null})	
  	}
  	console.log(user.dataValues)
  	let userSessionToken = generateSessionToken()
    user.setDataValue('sessionToken', userSessionToken);
    user.save();
    res.status(200).json({token: userSessionToken});
  });
});


router.post('/endSession',(req,res)=>{
	
  models.User.findOne({ 
    where:{
     sessionToken: req.body.token, 
    }
  }).then((user) => {
  	if(!user){
  	 res.status(200).json({token: null})	
  	}
    user.setDataValue('sessionToken', null);
    user.save();
    res.send();
  });
});


module.exports = router;
