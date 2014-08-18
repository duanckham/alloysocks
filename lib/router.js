var express = require('express');
var proxy = require('./proxy');
var router = express.Router();

router.all('/proxy', proxy.proxy);

module.exports = router;