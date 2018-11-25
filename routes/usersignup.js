var express = require('express');
var router = express.Router();
var dbmodule = require('../public/javascripts/dbmodule.js');


router.post('/', function(req, res, next) {
	console.log("signup");
	const username=req.body.username;
	const name=req.body.name;
	const email=req.body.email;
	const phoneno=req.body.phoneno;
	const password=req.body.password;
	dbmodule.registerUser(username,name,email,phoneno,password,res);  
});

module.exports = router;