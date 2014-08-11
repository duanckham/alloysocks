var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var router = require('./lib/router');
var app = express();

var options = {
	key: fs.readFileSync(__dirname + '/ca/alloysocks-key.pem'),
	cert: fs.readFileSync(__dirname + '/ca/alloysocks-cert.pem')
};

app.use('/', router);

http.createServer(app).listen(10001);
https.createServer(options, app).listen(10002);