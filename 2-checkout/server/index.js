require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");

// Establishes connection to the database on server start
const db = require("./db");

const app = express();
app.use(express.urlencoded({extended: true}));

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


app.get('/', (req, res) => {
  console.log('cookie get: ', req.session_id);
  res.status(200).send();
})

app.get('/id', (req, res) => {
  var session = req.session_id;
  var params = [session];
  //check if account has same session id
  db.queryAsync("SELECT * FROM account WHERE session = ?", params)
  .then((results) => {
    console.log('results from id get handler: ', results)
    if (results[0].length === 0) {
      //  if no then return F1
      res.status(200).send('F1');
    } else {
      //  if yes then check if address has same session id
      db.queryAsync("SELECT * FROM address WHERE session = ?", params)
      .then((results) => {
        if (results[0].length === 0) {
          //    if no then return F2
          res.status(200).send('F2');
        } else {
          //    if yes then check if billing has same session id
          db.queryAsync("SELECT * FROM billing WHERE session = ?", params)
          .then((results) => {
            if (results[0].length === 0) {
              //      if no then return F3
              res.status(200).send('F3');
            } else {
              //      if yes then check if summary table has session id and if did purchase is 0 or 1;
              db.queryAsync("SELECT * FROM summary WHERE session = ?", params)
              .then((results) => {
                if (results[0].length === 0) {
                  //        if no then return confirmation
                  res.status(200).send('confirmation');
                } else {
                  //        if yes and 1 then return 'home'
                  res.status(200).send('home');
                }
              })
            }
          })
        }
      })
    }
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

app.post('/account', (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var session = req.session_id;
  var params = [session, name, email, password];
  db.queryAsync("INSERT INTO account (session, name, email, password) VALUES (?, ?, ?, ?);", params)
  .then((results) => {
    res.status(201).send(results);
  })
  .catch((err) => {
    res.status(500).send(err)
  })
})

app.post('/address', (req, res) => {
  var line1 = req.body.line1;
  var line2 = req.body.line2;
  var city = req.body.city;
  var state = req.body.state;
  var zipcode = req.body.zip;
  var session = req.session_id;
  var params = [session, line1, line2, city, state, zipcode];
  db.queryAsync("INSERT INTO address (session, lineOne, lineTwo, city, state, zipcode) VALUES (?, ?, ?, ?, ?, ?);", params)
  .then((results) => {
    res.status(201).send(results);
  })
  .catch((err) => {
    res.status(500).send(err)
  })
})

app.post('/billing', (req, res) => {
  var ccNum = req.body.ccNum;
  var exp = req.body.exp;
  var cvv = req.body.cvv;
  var billingZip = req.body.billingZip;
  var session = req.session_id;
  var params = [session, ccNum, exp, cvv, billingZip];
  db.queryAsync("INSERT INTO billing (session, creditCardNumber, expiration, cvv, billingZipcode) VALUES (?, ?, ?, ?, ?);", params)
  .then((results) => {
    res.status(201).send(results);
  })
  .catch((err) => {
    res.status(500).send(err)
  })
})

app.get('/confirmation', (req, res) => {
  var session = req.session_id;
  var params = [session, session, session];

  // where account.session = session_id AND address.session = session_id AND billing.session = session_id
  db.queryAsync("SELECT * FROM account, address, billing WHERE account.session = ? AND address.session = ? AND billing.session = ?;", params)
  .then((results) => {
    console.log('results from confirmation data server: ', results);
    res.status(200).send(results);
  })
  .catch((err) => {
    res.status(500).send(err)
  })
})

app.post('/confirmation', (req, res) => {
  var purchase = req.body.didPurchase;
  var session = req.session_id;
  var params = [session, purchase];
  db.queryAsync("INSERT INTO summary (session, didPurchase) VALUES (?, ?);", params)
  .then((results) => {
    res.status(201).send(results);
  })
  .catch((err) => {
    res.status(500).send(err)
  })
})
/****
 *
 *
 * Other routes here....
 *
 *
 */

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
