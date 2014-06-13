var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var router = require('./lib/router');
var app = express();

var options = {
	key: fs.readFileSync('ca/alloysocks-key.pem'),
	cert: fs.readFileSync('ca/alloysocks-cert.pem')
};

app.use('/', router);

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);