const express = require("express");
const helmet = require('helmet');
const morgan = require('morgan');
// const log = require('../middleware/logger');


module.exports = function (app) {
  app.use(express.static('public'));
  app.use(helmet());
  app.use(express.json()); // req.body
  app.use(express.urlencoded({
    extended: true
  })); // key=value&key=value

  // app.use(log);

  // app.use(function (req, res, next) {
  //   console.log("Auth...");
  //   next();
  // });

  if (app.get('env') === 'development') {
    app.use(morgan('dev'));
    console.log('Morgan enabled...');
  }
}