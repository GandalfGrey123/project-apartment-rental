const express = require('express');
var models = require('../models');

const router = express.Router();

//permanently save a listing 
router.post('/', function(req,res){
	
	models.ListingPost.create({

	}).then(function(){
		res.redirect('/');
	});
});


router.get('/', function(req,res){
	
});


	
module.exports = router;