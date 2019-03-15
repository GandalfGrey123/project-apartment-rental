var Listing = require('../model/Listing');

exports.create = function(req,res){
	console.log(req.body);
	
	var newListing = new Listing(req.body);

	if(!newListing.status){
	  res.status(400).send({ error:true, message: 'bad request' });
	}

	else{
	   newListing.save(newListing, function(err, listing) {
    	 res.json(listing);
  	   });
	}
};