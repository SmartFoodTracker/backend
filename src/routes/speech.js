/*
* Created by Andrew Hoskins
* Copyright 2017 ECE 492 Group 2 (Winter 2017), University of Alberta. All rights reserved.
*/

import fs from 'fs';
import speech from '@google-cloud/speech';

let speechClient = speech({
 	projectId: 'centering-aegis-157021',
	credentials: JSON.parse(process.env.GCLOUD_KEY)
});

/**
* @api {post} /speech/:sampleRate Parse Speech File
* @apiGroup Speech
* @apiDescription With no "sampleRate" parameter given, default is 32000Hz. Pass sample rate either 32000 or 16000, depending on the environment.
*
* @apiParam (optional) {String} sampleRate either 32000 or 16000
* @apiParam (body) {Binary} file raw audio file
* @apiExample {curl} Example usage:
 *     curl -X POST --data-binary @"bridge.raw" -H "Content-Type: audio/wav" localhost:8080/speech/16000
*/
export function parseSpeech(req, res) {
	// if sample rate given, it must be 16k or 32k, otherwise its an error
	let sampleRate = null;
	if (req.params.sampleRate) {
		if (req.params.sampleRate == '16000' || req.params.sampleRate === '32000') {
			sampleRate = parseInt(req.params.sampleRate);
		} else {
			res.sendStatus(400);
			return;
		}
	}

	fs.writeFile('audio.raw', req.body, 'binary', (err) => {
		speechClient.recognize('./audio.raw', {
			encoding: 'LINEAR16',
			sampleRate: sampleRate || 32000
		}, (err, transcript) => {
			if (err) {
				res.sendStatus(400);
			} else if (!transcript) {
				res.send('Unable to recognize');
			} else {
				res.send(transcript);
			}
		});
	});
}

