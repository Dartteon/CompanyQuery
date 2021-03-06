require('dotenv').config();

const pg = require('pg');
const constants = require('../../constants');
const dbutils = require('../dbutils');

const createCompanyQuery = 
    'CREATE TABLE company (' +
        'id VARCHAR(64) PRIMARY KEY, ' +
        'name VARCHAR(64), ' +
        'crunchbase_url VARCHAR(2083), ' +
        'homepage_url VARCHAR(2083), ' +
        'category_code VARCHAR(32), ' +
        'number_of_employees INTEGER, ' +
        'founded_year INTEGER DEFAULT 0, ' +
        'founded_month INTEGER DEFAULT 0, ' +
        'founded_day INTEGER DEFAULT 0, ' +
        'deadpooled_year INTEGER DEFAULT 0, ' +
        'deadpooled_month INTEGER DEFAULT 0, ' +
        'deadpooled_day INTEGER DEFAULT 0, ' +
        'email_address VARCHAR(60), ' + 
        'phone_number VARCHAR(32), ' +
        'overview VARCHAR(4096)' +
    ');' ;

//13. tag_list
//total_money_raised
//acquisition

const createPersonQuery = 
    'CREATE TABLE person (' +
        'id VARCHAR(32) PRIMARY KEY, ' +    //AKA permalink
        'first_name VARCHAR(32), ' +
        'last_name VARCHAR(32) ' +
    ');' ;


const fundingRoundQuery = 
    'CREATE TABLE funding_round (' +
        'id INTEGER, ' +
        'cid VARCHAR(32), ' +
        'round_code VARCHAR(12), ' +
        'raised_amount INTEGER, ' +
        'raised_currency_code VARCHAR(4), ' +
        'funded_year INTEGER, ' +
        'funded_month INTEGER, ' +
        'funded_day INTEGER, ' +
        'PRIMARY KEY (id), ' +
        'FOREIGN KEY (cid) REFERENCES company(id)' +
        //Need investments or not?
    ');' ;
    
const createFoundedQuery =
    'CREATE TABLE founded (' +
        'cid VARCHAR(32), ' + 
        'pid VARCHAR(32), ' + 
        'title VARCHAR(32), ' +
        'FOREIGN KEY (cid) REFERENCES company(id), ' +
        'FOREIGN KEY (pid) REFERENCES person(id), ' +
        'PRIMARY KEY (cid, pid)' +
    ');' ;

const competitorQuery = 
    'CREATE TABLE competitor (' +
        'cid1 VARCHAR(32), ' + 
        'cid2 VARCHAR(32), ' + 
        'FOREIGN KEY (cid1) REFERENCES company(id), ' +
        'FOREIGN KEY (cid2) REFERENCES company(id), ' +
        'PRIMARY KEY (cid1, cid2)' +
    ');' ;

const createAcquireQuery = 
    'CREATE TABLE acquire (' +
        'cid1 VARCHAR(32), ' + 
        'cid2 VARCHAR(32), ' + 
        'FOREIGN KEY (cid1) REFERENCES company(id), ' +
        'FOREIGN KEY (cid2) REFERENCES company(id), ' +
        'PRIMARY KEY (cid1, cid2)' +
    ');' ;

dbutils.executeQueriesInOrder(
    createCompanyQuery, 
    createPersonQuery,
    fundingRoundQuery, 
    createFoundedQuery, 
    competitorQuery,
    createAcquireQuery)
    .then( () => console.log("Make tables done!") );
