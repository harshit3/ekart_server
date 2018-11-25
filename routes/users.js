var express = require('express');
var router = express.Router();
var dbmodule = require('../public/javascripts/dbmodule.js');


/* GET users listing. */
// router.get('/:username', function(req, res, next) {
// 	let username=req.params.username;
// 	// console.log("4:",username);
// 	// console.log("5: Calling validateUser function");

// 	dbmodule.validateUser(username,res);  
// });


router.get('/:username', function(req, res, next) {
	let username=req.params.username;
	dbmodule.validateUser(username,res);  
});

module.exports = router;
