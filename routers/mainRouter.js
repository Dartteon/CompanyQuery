const pg = require('pg');
const express = require('express');
const constants = require('../constants');
const queryExecuter = require('../database/queryExecuter/execute.js');
const Rx = require('rx');
const moment = require('moment');
const capitalize = require('capitalize');


const router = express.Router();

router.get('/', function(req, res) {
  var homepageInstructions = [
    { QueryExample_1: 'http://localhost:5000/companies?numFundingRounds=4&yearGreaterThan=2005&amountRaisedGreaterThan=200000000' }
  ];
  res.render('pages/main', {
    result: homepageInstructions
  });
});

router.get('/companies', function(req, res) {
  var numFundingRounds = req.query.numFundingRounds ? req.query.numFundingRounds : 3;
  var yearGreaterThan = req.query.yearGreaterThan ? req.query.yearGreaterThan : 2000;
  var amountRaisedGreaterThan = req.query.amountRaisedGreaterThan ? req.query.amountRaisedGreaterThan : 2000000;
  queryExecuter.getCompaniesWithConstraints(numFundingRounds, yearGreaterThan, amountRaisedGreaterThan).then(
    results => {
      res.render('pages/main', {
        result: results.rows
      });
      errorMessage = '';
    });
});
module.exports = router;
