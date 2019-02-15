var express = require('express');
var router = express.Router();

/* GET about page. */


router.get('/team', function(req, res, next) {
  res.render('about', {title: 'About' , showTeam: 'false'});
});


router.get("/:id", (req, res,next)=> {

   res.render("about",{ 
   	   title: 'About',
   	   name: req.params.id,
   	   showTeam: 'true'
   })
})

module.exports = router;
