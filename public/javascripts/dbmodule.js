var mongojs = require('mongojs');
var db = mongojs('mydb', ['products','users']);


db.products.createIndex({prod_id:1},{unique:true});


exports.validateUser = function(username,res){
	db.users.find({"username":username},function(err,users) {
	  	if(err || users.length===0){
   			console.log("Error in finding the username ",err);
   			res.send(err);
		}
  		else{
    		console.log("Found User in DB");
    		res.json(users);			
 		}
	}); 
}


exports.registerUser = function(username,name,email,phoneno,password,res){
	// console.log("dbmodule:",username);
	db.users.save({"username":username,"name":name,"email":email,"phoneno":phoneno,"password":password,address:[],card:[],wishlist:[],cart:[]},function(err,saved){
		if(err || !saved){
			console.log("User not registered");
			console.log(err);
			res.send(err);
		}
		else{
			console.log("User registered");
			res.json({msg:"User is successfully registered"});
		}
	}) 
}


exports.updateUser = function(username,name,email,phoneno,password,res){
	console.log("dbmodule:",username);
	db.users.update({"username":username},{$set:{"name":name,"phoneno":phoneno,"password":password}},function(err,updated){
		if(err || !updated){
			console.log("User not registered");
			console.log(err);
			res.send(err);
		}
		else{
			console.log("User updated");
			res.json({msg:"User is successfully updated"});
		}
	}) 
}


exports.addAddress = function(data,res){
	// console.log("dbmodule:",username);
	db.users.find({"username":data.username},function(err,user){
		if(err || user.length==0){
			res.send(err);
		}
		else{
			var userObject = user[0];
			var addressObject = userObject.address;
			addressObject.push(data);
			db.users.update({"username":data.username},{$set:{"address":addressObject}},function(err,updated){
				if(err || !updated){
				console.log(err);
				res.send(err);
				}
				else{
					console.log("Address added");
					res.json();
				}	
			})
		}
	}) 
}


exports.addCard = function(data,res){
	// console.log("dbmodule:",username);
	db.users.find({"username":data.username},function(err,user){
		if(err || user.length==0){
			res.send(err);
		}
		else{
			var userObject = user[0];
			var cardObject = userObject.card;
			cardObject.push(data.card);
			db.users.update({"username":data.username},{$set:{"card":cardObject}},function(err,updated){
				if(err || !updated){
				console.log(err);
				res.send(err);
				}
				else{
					console.log("Card added");
					res.json();
				}	
			})
		}
	}) 
}


exports.removeAddress = function(data,res){
	// console.log("dbmodule:",username);
	db.users.find({"username":data.username},function(err,user){
		if(err || user.length==0){
			res.send(err);
		}
		else{
			var userObject = user[0];
			var addressObject = userObject.address;
			console.log(data)
			addressObject=addressObject.filter(function(obj){
				return (obj.address1 != data.address1);
			});

			db.users.update({"username":data.username},{$set:{"address":addressObject}},function(err,updated){
				if(err || !updated){
				console.log(err);
				res.send(err);
				}
				else{
					console.log("Address removed");
					res.json();
				}	
			})
		}
	}) 
}


exports.removeCard = function(data,res){
	// console.log("dbmodule:",username);
	db.users.find({"username":data.username},function(err,user){
		if(err || user.length==0){
			res.send(err);
		}
		else{
			var userObject = user[0];
			var cardObject = userObject.card;
			// console.log(data)
			cardObject=cardObject.filter(function(obj){
				return (obj.cardnumber != data.cardnumber);
			});

			db.users.update({"username":data.username},{$set:{"card":cardObject}},function(err,updated){
				if(err || !updated){
				console.log(err);
				res.send(err);
				}
				else{
					console.log("Card removed");
					res.json();
				}	
			})
		}
	}) 
}


exports.addToWishlist = function(data,res){
	// console.log("dbmodule:",data.username);
	db.users.find({"username":data.username},function(err,user){
		if(err || user.length==0){
			res.send(err);
		}
		else{
			console.log("userfound....now adding to wishlist")
			var userObject = user[0];
			var wishlistObject = userObject.wishlist;
			wishlistObject.push(data.prodid);
			// console.log(wishlistObject);
			db.users.update({"username":data.username},{$set:{"wishlist":wishlistObject}},function(err,updated){
				if(err || !updated){
					console.log(err);
					res.send(err);
				}
				else{
					console.log("Added To Wishlist");
					res.json();
				}	
			})
		}
	}) 
}


exports.removeFromWishlist = function(data,res){
	// console.log("dbmodule:",username);
	db.users.find({"username":data.username},function(err,user){
		if(err || user.length==0){
			res.send(err);
		}
		else{
			var userObject = user[0];
			var wishlistObject = userObject.wishlist;
			console.log(data)
			wishlistObject=wishlistObject.filter(function(obj){
				return (obj != data.prodid);
			});

			db.users.update({"username":data.username},{$set:{"wishlist":wishlistObject}},function(err,updated){
				if(err || !updated){
				console.log(err);
				res.send(err);
				}
				else{
					console.log("Item removed from wishlist");
					res.json();
				}	
			})
		}
	}) 
}


exports.addToCart = function(data,res){
	// console.log("dbmodule:",data.username);
	db.users.find({"username":data.username},function(err,user){
		if(err || user.length==0){
			res.send(err);
		}
		else{
			console.log("userfound....now adding to cart")
			db.users.update({"username":data.username},{$set:{"cart":data.cartObj}},function(err,updated){
				if(err || !updated){
					console.log(err);
					res.send(err);
				}
				else{
					console.log("Product Added To Cart");
					res.json();
				}	
			})
		}
	}) 
}


exports.removeFromCart = function(data,res){
	// console.log("dbmodule:",username);
	db.users.find({"username":data.username},function(err,user){
		if(err || user.length==0){
			res.send(err);
		}
		else{
			var userObject = user[0];
			var cartObject = userObject.cart;
			console.log("data",data)
			cartObject=cartObject.filter(function(obj){
				return (obj.prodid != data.prodid);
			});

			db.users.update({"username":data.username},{$set:{"cart":cartObject}},function(err,updated){
				if(err || !updated){
				console.log(err);
				res.send(err);
				}
				else{
					console.log("Item removed from cart");
					res.json();
				}	
			})
		}
	}) 
}


exports.emptyCart = function(data,res){
	// console.log("dbmodule:",username);
	db.users.find({"username":data.username},function(err,user){
		if(err || user.length==0){
			res.send(err);
		}
		else{
			var userObject = user[0];
			db.users.update({"username":data.username},{$set:{"cart":[]}},function(err,updated){
				if(err || !updated){
				// console.log(err);
				res.send(err);
				}
				else{
					console.log("Cart Empty Now");
					res.json();
				}	
			})
		}
	}) 
}


exports.retreiveWishlist = function(data,res){

	db.products.find({prod_id:{$in:data.wishlistObject}},function(err,product) {
	  	if(err || (product.length==0)){
   			console.log("Error in finding the product ",err,product);
   			res.send(err);
		}
  		else{
    		// console.log("Found Products in DB",product);
    		res.json(product)

 		}
	});	
}


exports.retreiveCart = function(data,res){

	// console.log("cart",data.cartObj);
	prodid=[];
	data.cartObj.forEach(function(obj){
		prodid.push(obj.prodid);
	})

	// console.log("prodid",prodid);

	db.products.find({prod_id:{$in:prodid}},function(err,product) {
	  	if(err || (product.length==0)){
   			console.log("Error in finding the product ",err,product);
   			res.send(err);
		}
  		else{
    		// console.log("Found Products in DB",product);
    		data.cartObj.forEach(function(obj){
    			prodobj=product.filter(function(product){
    				return(obj.prodid===product.prod_id)
    			})
    			obj.product=prodobj[0];
    		})
    		// console.log("cartObj",data.cartObj)
    		res.json(data.cartObj)

 		}
	});	
}


exports.retreiveProducts = function(res){
	// console.log("6: inside vaidateuser function");
	db.products.find({},function(err,product) {
	  	if(err || (product.length==0)){
   			console.log("Error in finding the product ",err,product);
   			res.send(err);
		}
  		else{
    		console.log("Found Products in DB",product);
    		res.json(product);			
 		}
	});
}



exports.retreiveLaptops = function(res){
	// console.log("6: inside vaidateuser function");
	db.products.find({category:"Laptops"},function(err,laptop) {
	  	if(err || (laptop.length==0)){
   			console.log("Error in finding the product ",err);
   			res.send(err);
		}
  		else{
    		console.log("Found Products in DB",laptop);
    		res.json(laptop);			
 		}
	});
}

exports.retreivePhones = function(res){
	// console.log("6: inside vaidateuser function");
	db.products.find({category:"Smartphones"},function(err,phone) {
	  	if(err || (phone.length==0)){
   			console.log("Error in finding the product ",err);
   			res.send(err);
		}
  		else{
    		console.log("Found Products in DB",phone);
    		res.json(phone);			
 		}
	});

}


exports.retreiveSearchResults = function(searchtext,res){
	// console.log("inside retreiveSearchResults");
	var regex = new RegExp(searchtext, "i");
	db.products.find({$or:[{name:{$regex:regex}},{category:{$regex:regex}}]},function(err,result) {
	  	if(err || (result.length==0)){
   			console.log("Error in finding the results ",err);
   			res.send(err);
		}
  		else{
    		console.log("Found Results in DB",result);
    		res.json(result);			
 		}


	});
}


exports.retreiveProductDescription = function(prodid,res){
	// console.log("6: inside vaidateuser function");
	var product_id=parseInt(prodid);
	console.log("productid:",product_id);
	db.products.find({prod_id:product_id},function(err,product) {
	  	if(err || (product.length==0)){
   			console.log("Error in finding the product ",err);
   			res.send(err);
		}
  		else{
    		console.log("Found Product in DB",product);
    		res.json(product);			
 		}
	});

}