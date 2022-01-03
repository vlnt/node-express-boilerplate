var express = require('express');
var path = require('path')
var bodyParser = require("body-parser");
var secret = require('dotenv');
var app = express();

const staticPath = express.static(__dirname);
app.use( staticPath );

var payload = bodyParser.urlencoded({extended: false});
app.use(payload);

function logMW(req, res, next){
    console.log(req.method, req.path, "-", req.ip);
    next();
  }
app.use(logMW);

var timeServer = function getTime(req, res, next){
    req.time = new Date().toString();
    next();
   }

app.get("/", function(req, res){
  res.sendFile(__dirname + "/views/index.html");
  
});

app.get( "/json", function(req, res){
    const msg = {"message": "Hello json"};
    console.log(secret.config().parsed );
    if(process.env.MESSAGE_STYLE  == 'uppercase')
    res.json( {"message": "HELLO JSON"});
  } );

  app.get( "/now", timeServer, function(req,res){
    res.json({"time": req.time});
  } );

  app.route("/name")
  .get(function(req, res){
    var name = req.query.first + " " + req.query.last;
    res.json({ "name": name });
  } )
  .post(function(req, res){
    var name = req.body.first + " " + req.body.last;
    res.json({ "name": name });
  })






































 module.exports = app;
