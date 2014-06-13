var express = require('express');
var router = express.Router();

router.all('/', function(req, res) {
	res.send('AlloySocks.');
});

module.exports = router;