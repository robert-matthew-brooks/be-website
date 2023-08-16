const { Pool } = require('pg');

// TODO: use DOTENV to allow database to change to DEVELOPMENT or PRODUCTION
// the connection pool is only currently using the TEST database

module.exports = new Pool({database: 'be_website_test'});