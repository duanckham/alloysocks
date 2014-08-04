var request = require('request');
var ports = require('./ports');

exports.proxy = function(req, res) {
	var client_ip = req.connection.remoteAddress;
	var proxy_port = ports[~~(Math.random() * ports.length)];

	request.get('https://www.pandafan.org/pac/95a3ea74.pac', function(err, req, body) {
		res.send(body.replace(/PROXY q.gfw.li:\d+/, 'PROXY q.gfw.li:' + proxy_port));
	});

	console.log(new Date(), client_ip, '=>', proxy_port);
};