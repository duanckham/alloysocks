var sys = require('sys'),
	net = require('net'),
	dns = require('dns');

var STATES = {
	NOTCONNECTED: 0,
	NEW: 1,
	CONNECTING: 2,
	CONNECTED: 3
};

var server = net.createServer(function(socket) {
	socket.setEncoding("binary");
	var state = STATES.NOTCONNECTED;
	var server, port, host, headers;
	headers = '';

	var connection;
	var connecting_data = [];

	socket.addListener("connect", function() {
		state = STATES.NEW;
	});
	socket.addListener("receive", function(data) {
		if (state == STATES.CONNECTING) {
			connecting_data.push(data);
		} else if (state != STATES.CONNECTED) {
			headers += data;
			if ((data = ~"\r\n\r\n")) {
				var lines = headers.split("\r\n");
				var connect = lines.shift();
				var match = connect.match("CONNECT +([^:]+):([0-9]+).*");
				host = match[1];
				port = match[2];
				//sys.debug("connect " + host + " " + port);

				var resolution = dns.resolve4(host);

				resolution.addCallback(function(addresses, ttl, cname) {
					server = addresses[0];
					//sys.debug("server: " + server);

					connection = net.createConnection(port, server);
					connection.setEncoding("binary");
					connection.addListener("connect", function() {
						state = STATES.CONNECTED;
						for (var i = 0; i < connecting_data.length; i++) {
							connection.send(connecting_data[i]);
						}
					});
					connection.addListener("receive", function(data_from_server) {
						socket.send(data_from_server);
					});
					connection.addListener("eof", function(data) {
						socket.close();
					});

					state = STATES.CONNECTING;
					socket.send("HTTP/1.0 200 Connection established\r\n\r\n");
				});
			}
		} else {
			connection.send(data);
		}
	});

	socket.addListener("eof", function() {
		socket.close();
	});
});

server.listen(10001, '127.0.0.1');