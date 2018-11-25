var express = require('express');
var router = express.Router();
var dbmodule = require('../public/javascripts/dbmodule.js');


router.post('/', function(req, res, next) {
	// console.log(req.body)
	const data={
		username:req.body.username,
		prodid:req.body.prodid
	}
	// console.log("data",data);
	dbmodule.addToWishlist(data,res);  
});


router.post('/remove', function(req, res, next) {
	const data={
		username:req.body.username,
		prodid:req.body.prodid
	}
	
	dbmodule.removeFromWishlist(data,res);  
});


module.exports = router;