import http from 'http';
import express from 'express';
import speech from '@google-cloud/speech';

let app = express();
let port = process.env.PORT || 8080;

let speechClient = speech({
 	projectId: 'centering-aegis-157021',
	credentials: JSON.parse(process.env.GCLOUD_KEY)
});

app.get('/', (req, res) => {
	speechClient.recognize('./bridge.raw', {
	  encoding: 'LINEAR16',
	  sampleRate: 16000
	}, (err, transcript) => {
	  res.send(transcript);
	});
});

app.get('/1/inventory', (req, res) => {
	res.send([{
		title: 'banana',
		id: '234'
	}, {
		title: 'pear',
		id: '123'
	}]);
});

app.listen(port);
console.log('node server on ' + port);
