const http = require('http');
var myApp = require('./myApp');
var express = require('express');
//const { env } = require('process');
var secret = require('dotenv');
var app = express();

app.use(myApp);
var env = secret.config().parsed;

const server = http.createServer(app);
server.listen(env.PORT, ()=>{
    console.log("listening on port " +  env.PORT + "...");
});
