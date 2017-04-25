require('dotenv').config();

const pg = require('pg');
const constants = require('../../constants');
const queryStatements = require('../queryStatements/items');
const pool = new pg.Pool();


/* Reusable functions */


/**
 * Execute a query with the given arguments, and returns a promise.
 * The promise will contain the results. Use it like this:
 *
 *    executeAndLog(query, args).then( (results) => doSomething(results) );
 *
 * @param {*} query : The query string to execute.
 * @param {*} args : Optional. Arguments for the query.
 */
function executeAndLog(query, args) {
    let summary = query.substring(0, 50);
    console.log("%s...: EXECUTING", summary);
    console.log(query);
    let promise = pool.query(query, args).then( result => {
        console.log("%s...: SUCCESS. Returned %d rows.", summary, result.rowCount);
        return result;
    }).catch( e => {
        console.log("%s...: ERROR. Reason: %s %s", summary, e.name, e.message);
    });
    return promise;
}

exports.createTempCompany = function (id, name) {
    return executeAndLog(
        queryStatements.CREATE_TEMP_COMPANY, 
        [
            id, name
        ]
    );
}
exports.createUpdateCompany = function (
    id, name, crunchbaseUrl, homepageUrl, categoryCode, numEmployees, foundedYear, foundedMonth, foundedDay,
    deadpooledYear, deadpooledMonth, deadpooledDay, emailAddress, phoneNumber, overview) {
        return executeAndLog(
            queryStatements.CREATE_UPDATE_COMPANY, 
            [
                id, name, crunchbaseUrl, homepageUrl, categoryCode, numEmployees, foundedYear, foundedMonth, foundedDay,
                deadpooledYear, deadpooledMonth, deadpooledDay, emailAddress, phoneNumber, overview
            ]
        );
}

exports.createCompetitor = function (cid1, cid2) {
    return executeAndLog(
        queryStatements.CREATE_COMPETITOR, 
        [
            cid1, cid2
        ]
    );
}

exports.createFundingRound = function (fundingRoundId, fundingRoundCid, fundingRoundCode, fundingRoundAmount
    , fundingRoundCurrency, fundingRoundYear, fundingRoundMonth, fundingRoundDay) {
    return executeAndLog(
        queryStatements.CREATE_FUNDING_ROUND, 
        [
            fundingRoundId, fundingRoundCid, fundingRoundCode, fundingRoundAmount,
            fundingRoundCurrency, fundingRoundYear, fundingRoundMonth, fundingRoundDay
        ]
    );
}

exports.getCompaniesWithConstraints = function(numFundingRounds, yearGreaterThan, amountRaisedGreaterThan) {
    return executeAndLog(queryStatements.GET_COMPANIES_WITH_CONSTRAINTS,
        [numFundingRounds, yearGreaterThan, amountRaisedGreaterThan]
    );
}