const express = require('express');
var models = require('../models');

const router = express.Router();

router.get('/', function(req,res){
  //models.ListingPost.findAll().then((result) => res.json(result))
  models.ListingPost.findAll({
  	include: [models.HousingType,models.ListingImage]
  }).then(listings =>{
  	console.log(res.json(listings));
  });
	
});

module.exports = router;