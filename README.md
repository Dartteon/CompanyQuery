#### Step 0. NPM Install
> $ npm install

#### Step 1. Start pgsl server
Create/start pgsl server at:
> postgres://localhost:5432/test

#### Step 2. Create Schema with various tables
Run this script and all tables should be created in the database

```
npm run droptables
npm run maketables
npm run fixtures
```

#### Step 3. Start server
`app.js` is the entry point. To start server, run:
> $ nodemon app.js

Give me a list of all the companies with more than 3 funding rounds, raised more than $2million in total, founded after 2000
http://localhost:5000/companies?numFundingRounds=4&yearGreaterThan=2005&amountRaisedGreaterThan=200000000

Given an individual, give me a list of companies associated with him, and the nature of the relationship  
TBI

Given a company, give me a list of all associated companies, and the nature of the relationship  
TBI

Give me a list of all the companies that have acquired other companies in the AI space  
TBI

Locations of Noteworthy Files    
Schema - /database/schemas/createSchema.js    
Query Statements - /database/queryStatements/items.js   
Query Executors - /database/queryExecutor/executor.js   
Routing - /routers/mainRouter.js
Parsing/Populating Database Script - /database/fixtures.js
