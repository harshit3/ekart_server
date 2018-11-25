var express = require('express');
var router = express.Router();
var dbmodule = require('../public/javascripts/dbmodule.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
	dbmodule.retreiveProducts(res);
});


router.get('/laptops', function(req, res, next) {
	dbmodule.retreiveLaptops(res);
});


router.get('/phones', function(req, res, next) {
	dbmodule.retreivePhones(res);
});


router.post('/wishlist', function(req, res, next) {
	const data = {
		username:req.body.username,
		wishlistObject:req.body.wishlistObject
	}
	dbmodule.retreiveWishlist(data,res);

});


router.post('/cart', function(req, res, next) {
	const data = {
		cartObj:req.body.cartObj
	}
	dbmodule.retreiveCart(data,res);

});



module.exports = router;
