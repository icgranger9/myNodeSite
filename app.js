var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public/resources')));

app.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, 'views','index.html'));
});

app.get('/test', function(req, res, next) {
	res.sendFile(path.join(__dirname, 'views','test.html'));
});

app.get('/resume', function(req, res, next) {
	res.sendFile(path.join(__dirname, 'public/resources','Granger_Resume.pdf'));
});

app.get('/api', function(req, res, next) {
	res.sendFile(path.join(__dirname, 'views','test.html'));
});
app.listen(8080, function () {
	console.log('server listening on 8080');
});
