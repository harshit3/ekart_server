var express = require('express');
var router = express.Router();
var dbmodule = require('../public/javascripts/dbmodule.js');


router.post('/', function(req, res, next) {
	const data={
		username:req.body.username,
		card:req.body.card
	}
	
	dbmodule.addCard(data,res);  
});


router.post('/remove', function(req, res, next) {
	const data={
		username:req.body.username,
		cardnumber:req.body.cardnumber
	}
	
	dbmodule.removeCard(data,res);  
});

module.exports = router;