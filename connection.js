var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "dbmsproject",
  password: "1318",
  database: "afl"
});

//Get schedule Page
con.connect(function(err) {
  if (err) throw err;
  console.log("Mysql Connected");
});

module.exports = con;