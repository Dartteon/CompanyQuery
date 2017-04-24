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
