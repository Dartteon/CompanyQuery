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