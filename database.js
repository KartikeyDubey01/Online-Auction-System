const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'auctiondb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    decimalNumbers: true  // This ensures numbers are returned as numbers
});

module.exports = pool;