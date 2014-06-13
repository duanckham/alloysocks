var fs = require('fs');
var net = require('net');
var http = require('http');
var https = require('https');
var proxy = require('http-proxy');



// require('http').createServer(function(req, res) {
// 	proxy.createProxyServer({}).web(req, res, {target: req.url});
// }).listen(10001);


// proxy.createServer({
// 	ssl: {
// 		key: fs.readFileSync(__dirname + '/ca/alloysocks-key.pem', 'utf8'),
// 		cert: fs.readFileSync(__dirname + '/ca/alloysocks-cert.pem', 'utf8')
// 	},
// 	target: 'https://gitcafe.com:443',
// 	secure: true
// }).listen(10001);

proxy.createProxyServer({
	target: 'https://gitcafe.com',
	agent: https.globalAgent,
	headers: {
		host: 'gitcafe.com'
	}
}).listen(10001);


var https = require('https');



// httpProxy.createServer(function(req, res, proxy) {
// 	proxy.proxyRequest(req, res, {
// 		host: 'gitcafe.com',
// 		port: 443,
// 		target: {
// 			https: true
// 		}
// 	});
// }).listen(10002);

// httpProxy.createServer({
// 	ssl: {
// 		key: fs.readFileSync(__dirname + '/ca/alloysocks-key.pem', 'utf8'),
// 		cert: fs.readFileSync(__dirname + '/ca/alloysocks-cert.pem', 'utf8')
// 	},
// 	target: 'https://gitcafe.com:443',
// 	secure: true
// }).listen(10001);

// ----------------------------------

// var proxy = httpProxy.createServer({
// 	target: {
// 		host: 'localhost',
// 		port: 8000
// 	},
// 	ssl: {
// 		key: fs.readFileSync(__dirname + '/ca/alloysocks-key.pem', 'utf8'),
// 		cert: fs.readFileSync(__dirname + '/ca/alloysocks-cert.pem', 'utf8')
// 	}
// }).listen(10001);

// proxy.on('error', function(error, req, res) {
// 	console.log(error, req, res);
// });

// proxy.on('proxyRes', function(res) {
// 	console.log('RAW Response from the target', JSON.stringify(res.headers, true, 2));
// });


// var serverHttp = require('http').createServer(function(req, res) {

// 	console.log(req);

// 	httpProxy.createProxyServer({}).web(req, res, {
// 		target: req.url
// 	});
// }).listen(8000);


// ----------------------------------

// var listener = net.createServer(function(client) {
// 	client.on('data', function(data) {
// 		console.log('<-------------------');
// 		console.log(data);
// 		console.log(data.toString());
// 		console.log('------------------->');

// 		if (data[0] === 0x16 && data[1] === 0x03 && data[2] === 0x01 && data[3] === 0x00) {
// 			proxyHttps({host: 'gitcafe.com', port: 443}, data, client);
// 			return;
// 		}


// 		var headerStr = data.toString();
// 		var headerObj = {
// 			host: headerStr.match(/\r\nHost: (.*)\r\n/)[1],
// 			port: 80
// 		};

// 		if (headerStr.match(/CONNECT.*:443/))
// 			headerObj.port = 443;

// 		headerObj.port === 80
// 			? proxyHttp(headerObj, headerStr, client)
// 			: proxyHttps(headerObj, headerStr, client)
// 	});

// 	client.on('end', function() {
// 		console.log(', client end.');
// 	});
// });

// listener.listen(10001, function() {
// 	console.log(', init');
// });
