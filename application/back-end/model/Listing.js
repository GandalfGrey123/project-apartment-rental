const db = require('../database');

//constructor
var Listing = function(listInfo){
	this.title = listInfo.title;
	this.price = listInfo.price;
	this.address = listInfo.address;
	this.zip = listInfo.zip;
	this.description = listInfo.description;
};

Listing.save = function saveListing(newListing, result) {    
   //db.query("INSERT INTO listings set ?", newListing, function (err, res,fields) {
   //    if (error) throw error; 
   //});           
};
