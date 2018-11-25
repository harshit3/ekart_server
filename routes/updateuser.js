var express = require('express');
var router = express.Router();
var dbmodule = require('../public/javascripts/dbmodule.js');


router.post('/', function(req, res, next) {
	const username=req.body.username;
	const name=req.body.name;
	const email=req.body.email;
	const phoneno=req.body.phoneno;
	const password=req.body.password;
	dbmodule.updateUser(username,name,email,phoneno,password,res);  
});

module.exports = router;