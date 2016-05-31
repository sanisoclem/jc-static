var express = require('express');

module.exports = function  (req, res, next) {
  res.header('X-UA-Compatible' , "IE=Edge");
  next();
};
