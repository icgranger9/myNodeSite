var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public/resources')));

app.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, 'views/html','index.html'));
});

app.get('/test', function(req, res, next) {
	res.sendFile(path.join(__dirname, 'views/html','test.html'));
});

app.listen(8080, function () {
	console.log('server listening on 8080');
});
