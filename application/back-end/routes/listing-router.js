const express = require('express');
var models = require('../models');
const router = express.Router();
const _ = require('lodash');
const app = express();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// sequelize returns a json that needs to be cleaned up a bit
function clearListing(listing){
   delete listing['HousingTypeId']
   listing['housingType'] = listing['HousingType'] ? listing['HousingType'].type : null;
   delete listing['HousingType'];
   if(listing['ListingImages'] && _.isArray(listing['ListingImages'])){
     let images = listing['ListingImages']
       .map((value) => value.imageFile);
     delete listing['ListingImages'];
     listing['images'] = images;
   }
   else{
     delete listing['ListingImages'];
     listing['images'] = [];
   }
   listing['datePosted'] = (new Date(listing['datePosted'])).toLocaleString('en-us', { month: 'long' ,day:'numeric' });   
   return listing;
}

function clearListings(listings){
 return listings.map((l) => clearListing(l));
}

function convertSequilizeToObject(sequelizeResp){
  var replacer = app.get('json replacer');
  var spaces = app.get('json spaces');
  var body = JSON.stringify(sequelizeResp, replacer, spaces);
  return JSON.parse(body);
}

/*    
  newest, bedrooms, cheapest
*/
_buildSearchQuery = async (query) => {
  let searchQuery = {};
  let order = [];
  
  if (query.type) {
    let types = await models.HousingType.findAll({
      where: {
        type: query.type
      },
      attributes: [
        'id'
      ]
    });
    types = types.map((value) => value.id);
    searchQuery['HousingTypeId'] = types;
  }

  if(query.beds){
    searchQuery['bedrooms'] = {
      [Op.gte]: query.beds
    }
  }

  if(query.text){
    let txt = decodeURI(query.text);
    searchQuery[Op.or] = [
      {
        title: {
          [Op.like]: `%${txt}%`
        }
      },
      {
        description: {
          [Op.like]: `%${txt}%`
        }
      }
    ]
  }

  if(query.sortBy){
    if(query.sortBy === 'newest'){
      order.push([ 'datePosted', 'DESC' ])
    }else if(query.sortBy === 'bedrooms'){
      order.push([ 'bedrooms' ])
    }else if(query.sortBy === 'cheapest'){
      order.push([ 'price' ])
    }
  }

  return {
    searchQuery: searchQuery,
    order: order
  };
}

// http://docs.sequelizejs.com/manual/querying.html

//get listings route
router.get('/', async (req,res) => {
  let result = await _buildSearchQuery(req.query);
  models.ListingPost.findAll({
    include: [models.HousingType,models.ListingImage],
    exclude: [models.Chat],
    where: result.searchQuery,
    order: result.order
  }).then(listings =>{     
    var body = convertSequilizeToObject(listings);       
    res.json(clearListings(body));
  });
});

router.get('/one/:listingId', async (req,res) => {
  models.ListingPost.findOne({
    include: [models.HousingType,models.ListingImage],
    exclude: [models.Chat],
    where: { id: req.params.listingId }
  }).then(listing =>{     
    var body = convertSequilizeToObject(listing);       
    res.json(clearListing(body));
  });
});

//return all housing types that website provides
router.get('/types', (_, res) => {
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
