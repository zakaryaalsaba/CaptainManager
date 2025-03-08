const mysql = require("mysql2/promise");

// Create a connection pool for MySQL (Cloud SQL)
// host: "35.184.228.22",
// socketPath: `/cloudsql/deliveryproject-a8a9c:us-central1:deliverydb`,
//socketPath: `/cloudsql/deliveryproject-a8a9c:us-central1:deliverydb`,
 const pool = mysql.createPool({
  host: "35.184.228.22",
  user: "root",
  password: "root@@root1981",
  database: "deliverydb",
  connectionLimit: 10,
  port: "8080",
});

module.exports = pool;
