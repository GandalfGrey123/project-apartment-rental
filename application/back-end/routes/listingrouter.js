const express = require('express');
var models = require('../models');

const router = express.Router();

//permanently save a listing 
router.post('/', function(req,res){
	
	models.listing.create({
		// add data to database

	}).then(function(){
		res.redirect('/');
	});
});
	
module.exports = router;