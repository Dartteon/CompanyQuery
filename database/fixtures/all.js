const dbutils = require('../dbutils');
const dataJson = require('./companiesMini.json');
const executer = require('../queryExecuter/execute');

console.log('Populating database from companies.json');

for (var i = 0; i < dataJson.length; i++) {
    var companyId = dataJson[i].permalink;
    var companyName = dataJson[i].name;
    var crunchbaseUrl = dataJson[i].crunchbase_url;
    var homepageUrl = dataJson[i].homepage_url;
    var categoryCode = dataJson[i].categoryCode;
    var numEmployees = dataJson[i].number_of_employees;
    var foundedYear = dataJson[i].founded_year ? dataJson[i].founded_year : 0;
    var foundedMonth = dataJson[i].founded_month ? dataJson[i].founded_month : 0;
    var foundedDay = dataJson[i].founded_day ? dataJson[i].founded_day : 0;
    var deadpooledYear = dataJson[i].deadpooled_year ? dataJson[i].deadpooled_year : 0;
    var deadpooledMonth = dataJson[i].deadpooled_month ? dataJson[i].deadpooled_month : 0;
    var deadpooledDay = dataJson[i].deadpooled_day ? dataJson[i].deadpooled_day : 0;
    var emailAddress = dataJson[i].email_address;
    var phoneNumber = dataJson[i].phone_number;
    var overview = dataJson[i].overview;

    
    executer.createUpdateCompany(
        companyId, companyName, crunchbaseUrl, homepageUrl, categoryCode, numEmployees, foundedYear, foundedMonth, foundedDay,
        deadpooledYear, deadpooledMonth, deadpooledDay, emailAddress, phoneNumber, overview
    );
}