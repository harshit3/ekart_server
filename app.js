var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require('body-parser');
var cors = require('cors');
//var dbmodule = require('./public/javascripts/dbmodule.js')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userSignupRouter = require('./routes/usersignup');
var productsRouter = require('./routes/products');
var productDescriptionRouter = require('./routes/productdesc');
var searchRouter = require('./routes/searchtext');
var updateUserRouter = require('./routes/updateuser');
var addAddressRouter = require('./routes/addaddress');
var addCardRouter = require('./routes/addcard');
var addToWishlistRouter = require('./routes/addtowishlist');
var addToCartRouter = require('./routes/addtocart');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/searchtext', searchRouter);
app.use('/productdesc',productDescriptionRouter);
app.use('/usersignup',userSignupRouter);
app.use('/updateuser',updateUserRouter);
app.use('/addaddress',addAddressRouter);
app.use('/addcard',addCardRouter);
app.use('/addtowishlist',addToWishlistRouter);
app.use('/addtocart',addToCartRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(4000);
module.exports = app;
