const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",      // Replace with your MySQL host
  user: "root",           // Replace with your MySQL username
  password: "",   // Replace with your MySQL password
  database: "payment_system",       // Replace with your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    // console.error("MySQL connection error:", err);
  } else {
    // console.log("MySQL connected successfully!");
    connection.release();
  }
});

module.exports = pool;
