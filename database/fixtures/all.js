const dbutils = require('../dbutils');
const dataJson = require('./companies.json');
const executer = require('../queryExecuter/execute');

console.log('Populating database from companies.json');

for (var i = 0; i < dataJson.length; i++) {
    let currCompanyIndex = i;
    let companyId = dataJson[currCompanyIndex].permalink;
    let companyName = dataJson[currCompanyIndex].name;
    let crunchbaseUrl = dataJson[currCompanyIndex].crunchbase_url;
    let homepageUrl = dataJson[currCompanyIndex].homepage_url;
    let categoryCode = dataJson[currCompanyIndex].categoryCode;
    let numEmployees = dataJson[currCompanyIndex].number_of_employees;
    let foundedYear = dataJson[currCompanyIndex].founded_year ? dataJson[currCompanyIndex].founded_year : 0;
    let foundedMonth = dataJson[currCompanyIndex].founded_month ? dataJson[currCompanyIndex].founded_month : 0;
    let foundedDay = dataJson[currCompanyIndex].founded_day ? dataJson[currCompanyIndex].founded_day : 0;
    let deadpooledYear = dataJson[currCompanyIndex].deadpooled_year ? dataJson[currCompanyIndex].deadpooled_year : 0;
    let deadpooledMonth = dataJson[currCompanyIndex].deadpooled_month ? dataJson[currCompanyIndex].deadpooled_month : 0;
    let deadpooledDay = dataJson[currCompanyIndex].deadpooled_day ? dataJson[currCompanyIndex].deadpooled_day : 0;
    let emailAddress = dataJson[currCompanyIndex].email_address;
    let phoneNumber = dataJson[currCompanyIndex].phone_number;
    let overview = dataJson[currCompanyIndex].overview;

    let createCompanyPromise = executer.createUpdateCompany(
        companyId, companyName, crunchbaseUrl, homepageUrl, categoryCode, numEmployees, foundedYear, foundedMonth, foundedDay,
        deadpooledYear, deadpooledMonth, deadpooledDay, emailAddress, phoneNumber, overview
    );
    
    let competitors = dataJson[currCompanyIndex].competitions;
    let fundingRounds = dataJson[currCompanyIndex].funding_rounds;

    createCompanyPromise.then( () => {
            for (var j = 0; j < competitors.length; j++) {
                let competitorId = competitors[j].competitor.permalink;
                let competitorName = competitors[j].competitor.name;
                
                let competitorCompanyPromise = executer.createTempCompany(competitorId, competitorName);
                competitorCompanyPromise.then( ()=> {
                    executer.createCompetitor(companyId, competitorId);
                    executer.createCompetitor(competitorId, companyId);
                });
            }

            for (var k = 0; k < fundingRounds.length; k++) {
                let fundingRoundId = fundingRounds[k].id;
                let fundingRoundCid = companyId;
                let fundingRoundCode = fundingRounds[k].round_code;
                let fundingRoundAmount = fundingRounds[k].raised_amount;
                let fundingRoundCurrency = fundingRounds[k].raised_currency_code;
                let fundingRoundYear = fundingRounds[k].funded_year;
                let fundingRoundMonth = fundingRounds[k].funded_month;
                let fundingRoundDay = fundingRounds[k].funded_day;
                executer.createFundingRound(fundingRoundId, fundingRoundCid, fundingRoundCode, fundingRoundAmount
                    , fundingRoundCurrency, fundingRoundYear, fundingRoundMonth, fundingRoundDay)
            }
        }
    );
}