import fs from 'fs';
import speech from '@google-cloud/speech';

let speechClient = speech({
 	projectId: 'centering-aegis-157021',
	credentials: JSON.parse(process.env.GCLOUD_KEY)
});

// usage example: 
//  curl -X POST --data-binary @"bridge.raw" -H "Content-Type: audio/wav" localhost:8080/speech
export function parseSpeech(req, res) {
	fs.writeFile('audio.raw', req.body, 'binary', (err) => {
		speechClient.recognize('./audio.raw', {
			encoding: 'LINEAR16',
			sampleRate: 16000
		}, (err, transcript) => {
			res.send(transcript);
		});
	});
}