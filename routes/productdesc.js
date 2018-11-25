var express = require('express');
var router = express.Router();
var dbmodule = require('../public/javascripts/dbmodule.js');


router.get('/:prodid', function(req, res, next) {
	console.log("prod_id:",req.params.prodid);
	dbmodule.retreiveProductDescription(req.params.prodid,res);
//  res.send([{name:'harshit',lastname:'agrawal'},{name:'navneet',lastname:'agrawal'}]);
});

module.exports = router;