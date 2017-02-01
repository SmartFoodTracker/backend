import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { getInventory, deleteItem, createItem, modifyItem } from './routes/inventory';
import { parseSpeech } from './routes/speech';
import { parseBarcode } from './routes/barcode';

mongoose.connect(process.env.MONGODB_URI);

let app = express();

app.use(bodyParser.json({ limit: '50mb' }));

app.get('/:deviceId/inventory', getInventory);
app.put('/:deviceId/inventory', createItem);
app.put('/:deviceId/inventory/:itemId', modifyItem);
app.delete('/:deviceId/inventory/:itemId', deleteItem);

app.post('/speech', bodyParser.raw({ type: 'audio/wav', limit: '50mb' }), parseSpeech);
app.get('/barcode/:code', parseBarcode);

const port = process.env.PORT || 8080;
app.listen(port, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('node server started on port:', port);
	}
});