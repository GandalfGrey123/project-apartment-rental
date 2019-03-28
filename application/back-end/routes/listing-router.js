const express = require('express');
var models = require('../models');

const router = express.Router();

router.get('/', function(req,res){
  models.ListingPost.findAll({
  	include: [models.HousingType,models.ListingImage]
  }).then(listings =>{
  	res.json(listings);
  });
});

router.get('/types', (req, res) => {
  models.HousingType
    .findAll()
    .then((types) => res.json(types));
});

module.exports = router;

/*


const router = express.Router();

//permanently save a listing 
router.post('/', function(req,res){
 
 models.ListingPost.create({
 	
  }).then(function(){
	  res.redirect('/');
  });

});

	
module.exports = router;

*/