// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   port: "3306",
//   database: "node-complete",
//   password: "expert",
// });

// module.exports = pool.promise();

const Sequelize = require("sequelize");
const sequelize = new Sequelize("node-complete", "root", "Experte001$", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
