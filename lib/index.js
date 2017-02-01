import express from 'express';
import speech from '@google-cloud/speech';
import request from 'request';
import bodyParser from 'body-parser';
import fs from 'fs';
import mongoose from 'mongoose';

let app = express();
let port = process.env.PORT || 8080;

const GOOGLE_CLOUD = process.env.GCLOUD_KEY;
const MONGOOSE = process.env.MONGODB_URI;

let speechClient = speech({
 	projectId: 'centering-aegis-157021',
	credentials: JSON.parse(GOOGLE_CLOUD)
});

mongoose.connect(MONGOOSE, () => console.log('connected to database :)'));

let itemSchema = new mongoose.Schema({
	title: String,
	id: String,
	quantity: Number,
	units: String,
	dateAdded: Date,
	expiryDate: Date
});

let Item = mongoose.model('Items', itemSchema);

/*
database operations
*/

app.use(bodyParser.json());

app.get('/:deviceId/inventory', (req, res) => {
	Item.find({}, (err, documents) => {
		if (!err) {
			res.send(documents);
		} else {
			res.send('error');
		}
	});
});

app.delete('/:deviceId/inventory/:itemId', (req, res) => {
	Item.findByIdAndRemove(req.params.itemId, (err, doc) => {
		if (err) {
			res.send(err);
		} else {
			res.send('successfully removed item');
		}
	});
});

app.put('/:deviceId/inventory', (req, res) => {
	let item = new Item({
		title: req.body.title,
		quantity: req.body.quantity || 1,
		units: req.body.units || '',
		dateAdded: req.body.dateAdded || new Date(),
		expiryDate: req.body.expiryDate || null
	});

	item.save((err) => {
		if (err) {
			res.send(err);
		} else {
			res.send('successfully added to database');
		}
	});
});

app.put('/:deviceId/inventory/:itemId', (req, res) => {
	Item.findByIdAndUpdate(req.params.itemId, { $set: req.body }, { new: true }, (err, tank) => {
		if (err) res.send(err);
		res.send(tank);
	});
});


/*
speech and barcode translation
*/

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
