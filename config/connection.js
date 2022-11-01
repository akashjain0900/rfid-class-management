const mysql = require("mysql");
const config = require("./config");

const connection = mysql.createConnection(config.db);

connection.connect((error) => {
  if (error) console.log("Error Connecting to Database");
  else console.log("Connected to Database");
});

module.exports = connection;
