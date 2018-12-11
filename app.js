var express = require('express');
var request = require('request');
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
	res.sendFile(path.join(__dirname, 'public/resources','ian.json'));
});

app.all('/playlistSync', function(req, res, next) {
	
	request
	.get('http://localhost:9090'+req.originalUrl)
	.on('error', function(err) {
		console.log(err)
	})
	.on('response', function(response) {
		console.log(response.statusCode) // 200
		console.log(response.headers['content-type']) // 'image/png'
	})
	.pipe(res)

	//supposedly pipes everythin to the localhost. We'll see
	// const x = request('http://localhost:9090'+req.originalUrl)
 //    req.pipe(x);
 //    x.pipe(resp)	
});


app.listen(8080, function () {
	console.log('server listening on 8080');
});
