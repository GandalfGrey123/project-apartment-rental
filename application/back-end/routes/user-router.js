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
    	}
	 }).then(async (user) => {	
	
      if(!user && !await user.comparePassword(req.body.password)){
      	res.status(401).json({token: null, errorMessage:'failed!'})	
      }else{
      	let userSessionToken = generateSessionToken()
		user.setDataValue('sessionToken', userSessionToken);

		user.save().then(()=>{
   		 res.status(200).json({token: userSessionToken});
   		});
      }
  	});
});


router.post('/register',(req,res) =>{
	models.User.findOne({
		where:{
		 email: req.body.email,
		}
	}).then((user) =>{
		
	  //if email is already being used
		if(user){
	      res.status(400).json({result: 'email is already used'})  		  			 
		}

		models.User.create({
		  	email: req.body.email,
		  	password: req.body.password,
		  	firstName: req.body.firstName,
		  	lastName: req.body.lastName,
		  	isAdmin: req.body.isAdmin,
		  	sessionToken: null
		 });	
		
	 res.status(200).json({result: 'success!'});	 
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
    
    user.save().then(()=>{
     res.send(res.status(205).json({result: 'success!'}));
    });
    
  });
});


module.exports = router;
