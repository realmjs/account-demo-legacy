"use strict"
require('dotenv').config();

const api = require('@realmjs/account-restapi');

const helpers = require('./helpers');

api.helpers(helpers);

const express = require('express')
const app = express()
app.use('/',
  (req,res,next) => {console.log(`${req.method.toUpperCase()} request to: ${req.path}`); next()},
  (req,res,next) => setTimeout(_ => next(), 0),
  api.generate()
);

app.use('/assets', express.static('./node_modules/@realmjs/account-restapi/build'));
app.use('/assets', express.static('./server/assets'));

const PORT = process.argv[2] && parseInt(process.argv[2]) || 3100;

app.listen(PORT, function(err) {
  if (err) {
    console.log('Failed to start server!!!');
    console.log(err);
  } else {
    console.log('------------------------------------------------------------');
    console.log(`- @realmjs/account-restapi server is running at port ${PORT}`);
    console.log('------------------------------------------------------------');
  }
});
