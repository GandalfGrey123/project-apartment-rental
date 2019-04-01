const express = require('express');
var models = require('../models');
const router = express.Router();

const _ = require('lodash');
//const Op = require('sequelize').Op;



//get listings route
router.get('/', function(req,res){

  //if search parameters
  if(req.query.type ){ 
     models.HousingType.findAll({
      where:{
        type: req.query.type
      }, include:[models.ListingPost]

     }).then(listings =>{
       console.log(listings);
       res.json(listings);
     });
  }

  //else return all
  else{

     models.ListingPost.findAll({
       include: [models.HousingType,models.ListingImage],
       attributes: [
         'title',
         'description',
         'price',
         'line1',
         'line2',
         'city',
         'state',
         'zipCode',
         'bedrooms',
         'bathrooms',
         'isApproved',
         ]
     }).then(listings =>{
       console.log(listings);
       res.json(listings);
     });
  }
});


//return all housing types that website provides
router.get('/types', (req, res) => {
  models.HousingType
    .findAll()
    .then((types) => res.json(types));
});


//create new listing
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



// sequelize returns a json that needs to be cleaned up a bit
//function clearListings(listings){
//
//  console.log(' .>>>>>>>>. clearing the listings....');
//  for(let i = 0; i < listings.length; i++){
//    
//    console.log(' .>>>>>>>>. clearing the listings.... >>>>> - for each');
//    console.log(delete listings[i]['HousingTypeId']);
//
//    listings[i]['housingType'] = listings[i]['HousingType'] ? listings[i]['HousingType'].type : null;
//    delete listings[i]['HousingType'];
//
//
//    if(listings[i]['ListingImages'] && _.isArray(listings[i]['ListingImages'])){
//      let images = listings[i]['ListingImages']
//        .map((value) => value.imageFile);
//      delete listings[i]['ListingImages'];
//      listings[i]['images'] = images;
//    }
//
//
//    else{
//      delete listings[i]['ListingImages'];
//      listings[i]['images'] = [];
//    }
//    console.log(listings);
//  }
//  return listings;
//}
//