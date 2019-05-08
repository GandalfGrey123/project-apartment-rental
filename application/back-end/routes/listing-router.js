const express = require('express');
var models = require('../models');
const router = express.Router();

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { clearListing, convertSequilizeToObject, findUserBySession } = require('../utils/index');

function clearListings(listings) {
  return listings.map((l) => clearListing(l));
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
        city: {
          [Op.iLike]: `%${txt}%`
        }
      },
      {
        zipCode: {
          [Op.iLike]: `%${txt}%`
        }
      },
      {
        state: {
          [Op.iLike]: `%${txt}%`
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
router.post('/new', async (req, res) => {

  const user = await findUserBySession(req);
  if(!user){
    res.status(401).send();
    return;
  }

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
        HousingTypeId: housingType.dataValues.id,
        UserId: user.id
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
