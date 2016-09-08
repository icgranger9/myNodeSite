var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, 'views','index.html'));
});

app.get('/test', function(req, res, next) {
	res.sendFile(path.join(__dirname, 'views','test.html'));
});

app.listen(8080, function () {
	console.log('server listening on 8080');
});
