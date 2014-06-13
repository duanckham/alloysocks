var express = require('express');
var https = require('https');
var http = require('http');
var app = express();

var options = {
	key: fs.readFileSync('ca/alloysocks-key.pem'),
	cert: fs.readFileSync('ca/alloysocks-cert.pem')
};

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);