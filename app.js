var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();

var Mailer = require("./app/mail.js");
const SECRETKEY = require("./secretkey.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



app.post("/sendemail", function(req, res) {

  if (! req.body.key || req.body.key !== SECRETKEY) {
    return res.status(403).send({"error" : true, "message" : "not authorized"});
  }

  Mailer(req.body.email, req.body.name, req.body.password, req.body.service, req.body.subject, req.body.html, req.body.emails)
  .then((info) => {
    res.send({"success" : true, "results" : info});
  })
  .catch((e) => {
    res.status(500).send({"error" : true, "message" : e});
  });

});


app.listen(9000, function () {

})


module.exports = app;
