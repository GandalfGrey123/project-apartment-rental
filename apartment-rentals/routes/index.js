var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { pageTitle: 'Homepage' , bannertitle: 'HomePage - CSC648 Team9' });
});

module.exports = router;
