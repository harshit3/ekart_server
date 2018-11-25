var express = require('express');
var router = express.Router();
var dbmodule = require('../public/javascripts/dbmodule.js');


/* GET users listing. */
router.get('/:text', function(req, res, next) {
	// console.log("calling retreive search result");
	// console.log("input:",req.params.text)

	dbmodule.retreiveSearchResults(req.params.text,res);
//  res.send([{name:'harshit',lastname:'agrawal'},{name:'navneet',lastname:'agrawal'}]);
});

module.exports = router;
