import http from 'http';
import express from 'express';

var app = express();
var port = process.env.PORT || 8080;

app.get('/', (req, res) => {
	res.send('serving root of server');
})

app.listen(port);
console.log('restful server on ' + port);
