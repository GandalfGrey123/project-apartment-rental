const express = require('express');
const router = express.Router();
var listingController = require('../controller/ListingController');

router.route('/').post(listingController.createListing);

module.exports = router;