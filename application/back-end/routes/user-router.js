const express = require('express');
const router = express.Router();
var User = require('../models/user');
const passport = require('passport');

//registration and login routes
router.post('/register',
    passport.authenticate('signup', {
      successRedirect: '/user/success',
      failureRedirect: '/user/register',
      failureFlash: false,
    })
);


module.exports = router;