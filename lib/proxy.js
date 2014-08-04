var request = require('request');
var ports = require('./ports');

exports.proxy = function(req, res) {
	request.get('https://www.pandafan.org/pac/95a3ea74.pac', function(err, req, body) {
		res.send(body.replace(/PROXY q.gfw.li:\d+/, 'PROXY q.gfw.li:' + ports[~~(Math.random() * ports.length)]));
	});
};