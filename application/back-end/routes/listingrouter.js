const express = require('express');
var models = require('../models');

const router = express.Router();
router.post('/', function(req,res){

	models.listing.create({
		title: req.body.title,
		price: req.body.price,
		address: req.body.address,
		zip: req.body.zip,
		description: req.body.description

	}).then(function(){
		res.redirect('/');
	});
});
	
module.exports = router;