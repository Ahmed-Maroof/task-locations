// db.js

const { Pool } = require('pg');

// Create a new database connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'task1',
    password: '1234',
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
