require('dotenv').config();
const constants = require('../../constants');
const dbutils = require('../dbutils');

const dropCompanyQuery = 'DROP TABLE company;';
const dropFundingRoundQuery = 'DROP TABLE funding_round;';
const dropPersonQuery  = 'DROP TABLE person;';
const dropFoundedQuery = 'DROP TABLE founded;';
const dropCompetitorQuery = 'DROP TABLE competitor';
const dropAcquireQuery = 'DROP TABLE acquire';

dbutils.executeQueriesInOrder(
    dropAcquireQuery, dropCompetitorQuery, dropFundingRoundQuery, dropFoundedQuery, dropCompanyQuery, dropPersonQuery)
    .then( () => console.log("Drop tables done!") );
