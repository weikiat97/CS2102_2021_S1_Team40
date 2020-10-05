const { Pool } = require('pg');
const dotenv = require('dotenv');
const { db_connection_string } = require('./settings');
dotenv.config();

// establish connection to database
module.exports = new Pool({ connectionString: db_connection_string });