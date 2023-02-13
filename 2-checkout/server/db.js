const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS account (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, session VARCHAR(40), name TEXT, email TEXT, password TEXT)"
    )
  )
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS address (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, session VARCHAR(40), lineOne TEXT, lineTwo TEXT, city TEXT, state TEXT, zipcode INT(5) NOT NULL)"
    )
  )
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS billing (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, session VARCHAR(40), creditCardNumber BIGINT(25) NOT NULL, expiration INT(4) NOT NULL, cvv INT(3) NOT NULL, billingZipcode INT(5) NOT NULL)"
    )
  )
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS summary (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, session VARCHAR(40), didPurchase TINYINT)"
    )
  )
  .catch((err) => console.log(err));

module.exports = db;
