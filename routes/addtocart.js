var express = require('express');
var router = express.Router();
var dbmodule = require('../public/javascripts/dbmodule.js');


router.post('/', function(req, res, next) {
	// console.log(req.body)
	const data={
		username:req.body.username,
		cartObj:req.body.cartObj
	}
	// console.log("data",data);
	dbmodule.addToCart(data,res); 
});


router.post('/remove', function(req, res, next) {
	const data={
		username:req.body.username,
		prodid:req.body.prodid
	}
	
	dbmodule.removeFromCart(data,res);  
});


router.post('/empty', function(req, res, next) {
	const data={
		username:req.body.username
	}
	
	dbmodule.removeFromCart(data,res);  
});

module.exports = router;