var net = require('net');
var dns = require('dns');
var spdy = require('spdy');
var http = require('http');
var proxy = require('http-proxy');

var listener = net.createServer({allowHalfOpen: true}, function(clientSocket) {
	var connectState = 0;
	var conn;
	var clientBufList = [];

	// clientSocket.setEncoding('binary');
	clientSocket.on('error', function(error) {
		console.log(', clientSocket', error.stack);
	});

	clientSocket.on('data', function(clientData) {
		console.log(', connectState', connectState);

		if (connectState === 0) {

			var clientDataStr = clientData.toString();
			var match = clientDataStr.match('CONNECT +([^:]+):([0-9]+).*');
			var host, port;

			if (match) {
				host = match[1];
				port = match[2];
			} else {
				host = clientDataStr.match(/Host: (.*)\r\n/)[1];
				port = 80;
			}

			// console.log(',', host, port);
			// console.log(', clientDataStr', clientDataStr);

			dns.resolve4(host, function(error, address) {
				console.log(',', address);

				conn = net.createConnection(port, address[0]);
				
				// conn.setEncoding('binary');
				conn.on('connect', function() {
					connectState = 2;

					clientBufList.forEach(function(buf) {
						conn.write(buf);
					});

					console.log(', conn connected.');
				});

				conn.on('timeout', function() {
					console.log(', conn timeout.');
				})

				conn.on('error', function(error) {
					console.log(', conn', error);
				});

				conn.on('data', function(serverData) {
					console.log(', conn data.');
					console.log(serverData.toString());

					clientSocket.write(serverData);
				});

				conn.on('end', function() {
					console.log(', conn end.');
					clientSocket.destroy();
				});

				conn.write('HTTP/1.1 200 Connection established\r\n\r\n');

				connectState = 1;
			});
		}

		if (connectState === 1) {
			clientBufList.push(clientData);
		}

		if (connectState === 2) {
			// conn.write(clientData);
		}
	});
});

listener.listen(10001, function() {
	console.log(', listener init.');
});