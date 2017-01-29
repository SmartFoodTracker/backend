import http from 'http';
import express from 'express';
import speech from '@google-cloud/speech';

let app = express();
let port = process.env.PORT || 8080;

let speechClient = speech({
 	projectId: 'centering-aegis-157021',
	credentials: {
	    private_key: process.env.PRIVATE_KEY,
	    client_email: process.env.CLIENT_EMAIL
	}
});

app.get('/', (req, res) => {
	speechClient.recognize('./bridge.raw', {
	  encoding: 'LINEAR16',
	  sampleRate: 16000
	}, (err, transcript) => {
	  res.send(transcript);
	});
});

app.listen(port);
console.log('node server on ' + port);
