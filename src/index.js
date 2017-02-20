import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { getInventory, deleteItem, createItem, modifyItem, getItem } from './routes/inventory';
import { parseSpeech } from './routes/speech';
import { parseBarcode } from './routes/barcode';
import { getRecipes, getHomeRecipes } from './routes/recipes';
import { newDevice } from './routes/device';
import { newUser } from './routes/user';

import config from './config/index.js';

let app = express();

mongoose.connect(config[process.env.NODE_ENV].mongo, {
	server: {
		socketOptions: {
			socketTimeoutMS: 0,
			connectionTimeout: 0
		}
	}
});

app.use(bodyParser.json({ limit: '50mb' }));

app.post('/device', newDevice);
app.post('/user', newUser);

app.get('/:deviceId/inventory', getInventory);
app.put('/:deviceId/inventory', createItem);
app.put('/:deviceId/inventory/:itemId', modifyItem);
app.get('/:deviceId/inventory/:itemId', getItem);
app.delete('/:deviceId/inventory/:itemId', deleteItem);

app.post('/speech', bodyParser.raw({ type: 'audio/wav', limit: '50mb' }), parseSpeech);
app.get('/barcode/:code', parseBarcode);

app.get('/recipes', getRecipes);
app.get('/:userId/recipes', getHomeRecipes);

app.use((req, res, next) => {
	res.status(404);
	res.send('404 - invalid route');
});

app.use((err, req, res, next) => {
	res.status(500);
	res.send('500 - server error');
});

const port = process.env.PORT || 8080;
app.listen(port, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('node server started on port:', port);
	}
});

export default app;