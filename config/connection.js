const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres'
  }
);

module.exports = pool;
