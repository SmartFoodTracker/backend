import express from 'express';
import speech from '@google-cloud/speech';
import request from 'request';
import bodyParser from 'body-parser';
import fs from 'fs';

let app = express();
let port = process.env.PORT || 8080;

let speechClient = speech({
 	projectId: 'centering-aegis-157021',
	credentials: JSON.parse(process.env.GCLOUD_KEY)
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

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ type: 'audio/wav', limit: '50mb' }));

// usage example: 
//  curl -X POST --data-binary @"bridge.raw" -H "Content-Type: audio/wav" localhost:8080/speech
app.post('/speech', (req, res) => {
	fs.writeFile('audio.raw', req.body, 'binary', (err) => {
		speechClient.recognize('./audio.raw', {
			encoding: 'LINEAR16',
			sampleRate: 16000
		}, (err, transcript) => {
			res.send(transcript);
		});
	});
});

app.get('/barcode/:code', (req, res) => {
	const key = 'e2a3f4e45a2523d43526f73562461366';
	const barcode = req.params.code;

	request(`https://api.outpan.com/v2/products/${barcode}?apikey=${key}`, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			res.send(JSON.parse(body).name);
		} else {
			res.send('Unknown product');
		}
	});
});

app.listen(port);
console.log('node server on ' + port);
