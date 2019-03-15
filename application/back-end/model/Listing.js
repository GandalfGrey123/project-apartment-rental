const db = require('../database');

//constructor
//var Listing = function(..){};

Listing.save = function saveListing(newListing, result) {    
   db.query("INSERT INTO listings set ?", newListing, function (err, res,fields) {
       if (error) throw error; 
   });           
};
