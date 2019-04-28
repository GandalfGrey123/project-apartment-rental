const express = require('express');
var models = require('../models');
const router = express.Router();
const _ = require('lodash');
const app = express();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
    where: result.searchQuery,
    order: result.order
  }).then(listings =>{     
    var body = convertSequilizeToObject(listings);       
    res.json(clearListing(body));
  });
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
