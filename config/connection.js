// MySQL connection 
const mysql = require("mysql2");

let pool;
if (process.env.JAWSDB_URL) {
    pool = mysql.createPool(process.env.JAWSDB_URL)
} else {      
      pool = mysql.createPool({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "12345",
        database: "huddle_db",
        connectionLimit: 100
      });
    }

module.exports = pool;
