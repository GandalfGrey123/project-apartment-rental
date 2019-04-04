const express = require('express');
var models = require('../models');
const router = express.Router();
const _ = require('lodash');
const app = express();

// sequelize returns a json that needs to be cleaned up a bit
function clearListing(listings){

 for(let i = 0; i < listings.length; i += 1){
   delete listings[i]['HousingTypeId']
   listings[i]['housingType'] = listings[i]['HousingType'] ? listings[i]['HousingType'].type : null;
   delete listings[i]['HousingType'];
   if(listings[i]['ListingImages'] && _.isArray(listings[i]['ListingImages'])){
     let images = listings[i]['ListingImages']
       .map((value) => value.imageFile);
     delete listings[i]['ListingImages'];
     listings[i]['images'] = images;
   }
   else{
     delete listings[i]['ListingImages'];
     listings[i]['images'] = [];
   }

  listings[i]['datePosted'] = (new Date(listings[i]['datePosted'])).toLocaleString('en-us', { month: 'long' ,day:'numeric' });   
 }
 return listings;
}

function convertSequilizeToObject(sequelizeResp){
  var replacer = app.get('json replacer');
  var spaces = app.get('json spaces');
  var body = JSON.stringify(sequelizeResp, replacer, spaces);
  return JSON.parse(body);
}

//get listings route
router.get('/', function(req,res){
  //if search parameters
  if(req.query.type ){ 
    models.HousingType.findAll({
      where:{
        type: req.query.type
      },
      attributes: [
        'id'
      ]
    }).then((types) => {
      types = convertSequilizeToObject(types);
      types = types
        .map((value) => value.id);
      models.ListingPost.findAll({
        include: [models.HousingType,models.ListingImage],
        where: { 'HousingTypeId': types }
      }).then(listings =>{
        var body = convertSequilizeToObject(listings);
        res.json(clearListing(body));
      });
    });    
  }else{
     //else return all
     models.ListingPost.findAll({
       include: [models.HousingType,models.ListingImage],
     }).then(listings =>{     
       var body = convertSequilizeToObject(listings);       
       res.json(clearListing(body));
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
