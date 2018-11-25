var express = require('express');
var router = express.Router();
var dbmodule = require('../public/javascripts/dbmodule.js');


router.post('/', function(req, res, next) {
	const data={
		username:req.body.username,
		name:req.body.name,
		address1:req.body.address1,
		address2:req.body.address2,
		city:req.body.city,
		state:req.body.state,
		pincode:req.body.pincode,
		phoneno:req.body.phoneno
	}
	
	dbmodule.addAddress(data,res);  
});


router.post('/remove', function(req, res, next) {
	const data={
		username:req.body.username,
		address1:req.body.address1
	}
	
	dbmodule.removeAddress(data,res);  
});

module.exports = router;