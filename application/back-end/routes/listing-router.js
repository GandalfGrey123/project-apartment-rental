const express = require('express');
var models = require('../models');
const _ = require('lodash');

let multer = require('multer');
let fileUploads = multer();

const router = express.Router();
const Op = require('sequelize').Op;

// sequelize returns a json that needs to be cleaned up a bit
function clearListings(listings){

  console.log(' .>>>>>>>>. clearing the listings....');
  for(let i = 0; i < listings.length; i++){
    console.log(' .>>>>>>>>. clearing the listings.... >>>>> - for each');
    console.log(delete listings[i]['HousingTypeId']);
    listings[i]['housingType'] = listings[i]['HousingType'] ? listings[i]['HousingType'].type : null;
    delete listings[i]['HousingType'];
    if(listings[i]['ListingImages'] && _.isArray(listings[i]['ListingImages'])){
      let images = listings[i]['ListingImages']
        .map((value) => value.imageFile);
      delete listings[i]['ListingImages'];
      listings[i]['images'] = images;
    }else{
      delete listings[i]['ListingImages'];
      listings[i]['images'] = [];
    }
    console.log(listings);
  }
  return listings;
}


router.get('/all',function(req,res){
  models.ListingPost.findAll({
    include: [models.HousingType,models.ListingImage]
  }).then(listings =>{
    res.json(listings);
  });
});


//route for custom HousingTypes serach 
router.get('/', function(req,res){

  if(req.query.type && _.isArray(req.query.type)){
    // parameters where provided
    console.log('paramters: ', req.query.type) // returns [ 'Apartment', 'Room' ]
  }else{
    models
      .ListingPost
      .findAll({
        include: [models.HousingType,models.ListingImage],
        // raw: true
      })
      .then((listings) => res.json(listings));
      // listings = clearListings(listings.dataValues); // need to make it work
      // res.json(listings);
  }

  // res.status = 204;
  // res.send();
  
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
router.post('/new', (req, res) =>{

  models.HousingType
    .findOne({ where: { type: req.body.housingType } })
    .then((housingType) => {

      // Insert Listing
      models.ListingPost.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        ...req.body.address,
        isApproved: false,
        bathrooms: req.body.bathrooms,
        bedrooms: req.body.bedrooms,
        HousingTypeId: housingType.dataValues.id
      }).then((createdListing) => {
        // Save Images
        const images = req.body.images;
        const imagesToInsert = [];
        for(let i = 0; i < images.length; i++){
          imagesToInsert.push({
            ListingPostId: createdListing.dataValues.id,
            imageFile: new Buffer(images[0], 'base64')
          });
        }
        if(imagesToInsert.length > 0){
          models.ListingImage.bulkCreate(imagesToInsert)
        }
      });

    })

  res.status = 204;
  res.send();
});

module.exports = router;