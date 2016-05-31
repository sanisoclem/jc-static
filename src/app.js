var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var pkgJson = require('../package.json');

var routeDefault = require('./routes/default');

var mdlIe = require('./middle/ie');

// -- create express application
var app = express();

// -- expose app global vars
app.locals.pkgJson = pkgJson;

// view engine setup
app.set('views', path.join(__dirname, '../views')); // -- set view path
app.set('view engine', 'hbs'); // -- use handlebars
app.set('view options',{layout: 'layouts/default'});

// -- static resources
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// -- register middleware
app.use(mdlIe);

// -- register routes
app.use(routeDefault);

// catch everything else turn into 404 errors
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


if (app.get('env') === 'development') {
    // development error handler
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: "Error",
            version: req.app.locals.pkgJson.version
        });
    });
} 
else 
{
    // production error handler
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {},
            title: "Error",
            version: req.app.locals.pkgJson.version
        });
    });    
}

module.exports = app;