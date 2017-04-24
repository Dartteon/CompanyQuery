const pg = require('pg');
const express = require('express');
const constants = require('../constants');
const queryExecuter = require('../database/queryExecuter/execute.js');
const Rx = require('rx');
const moment = require('moment');
const capitalize = require('capitalize');


const router = express.Router();

var username = '';
var errorMessage = '';


router.get('/', function(req, res) {
  var homepageInstructions = [
    { TBI: '' }
  ];
  res.render('pages/main', {
    result: homepageInstructions
  });
});

module.exports = router;
