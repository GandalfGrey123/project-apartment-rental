const express = require('express');
var models = require('../models');

let multer = require('multer');
let fileUploads = multer();

const router = express.Router();
const Op = require('sequelize').Op;


router.get('/all',function(req,res){
  models.ListingPost.findAll({
    include: [models.HousingType,models.ListingImage]
  }).then(listings =>{
    res.json(listings);
  });
});


//route for custom HousingTypes serach 
router.get('/', function(req,res){
  //req.query.housingTypes => returns array of selected housing types
  console.log(req.query.type); // returns [ 'Apartment', 'Room' ]

  res.status = 204;
  res.send();
  
  //models.HousingType.findAll({
  //  where: {
  //    type:[
  //      {
  //        [Op.or]: req.query.housingTypes
  //      }
  //    ]
  //  }
  //	//include: [models.HousingType,models.ListingImage]
  //}).then(listings =>{
  //	res.json(listings);
  //});
});


//return all housing types that website provides
router.get('/types', (req, res) => {
  models.HousingType
    .findAll()
    .then((types) => res.json(types));
});


//new listing
router.post('/new',fileUploads.fields([]),function(req,res){

  models.ListingPost.create({ 

    title:req.body.title,
    description:req.body.description,
    price:req.body.price,
    address:req.body.address,
    city:req.body.city,
    state:req.body.state,
    zipCode:req.body.zip,
    bedrooms:req.body.bedrooms,
    bathrooms:req.body.bathrooms,    
    isApproved: false,

    HousingTypeId: 1,
    UserId: 2,

  }).then(function(){
    res.redirect('/');
  });
});

module.exports = router;
