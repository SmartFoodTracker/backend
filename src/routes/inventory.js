import Item from '../models/item';

export function getInventory(req, res) {
	Item.find({}, (err, documents) => {
		if (!err) {
			res.send(documents);
		} else {
			res.sendStatus(500);
		}
	});
}

export function deleteItem(req, res) {
	Item.findByIdAndRemove(req.params.itemId, (err, doc) => {
		if (err) {
			res.sendStatus(500);
		} else {
			getInventory(req, res);
		}
	});
}

export function createItem(req, res) {
	let item = new Item({
		title: req.body.title,
		quantity: req.body.quantity || 1,
		units: req.body.units || '',
		timeAdded: req.body.timeAdded || new Date().getTime(),
		expiryTime: req.body.expiryTime || null
	});

	item.save((err) => {
		if (err) {
			res.sendStatus(500);
		} else {
			getInventory(req, res);
		}
	});
}

export function modifyItem(req, res) {
	Item.findByIdAndUpdate(req.params.itemId, { $set: req.body }, { new: true }, (err, doc) => {
		if (err) {
			res.sendStatus(500);
		} else {
			getInventory(req, res);
		}
	});
}

export function getItem(req, res) {
	Item.findById(req.params.itemId, (err, doc) => {
		if (err) {
			res.sendStatus(500);
		} else {
			res.send(doc);
		}
	});
}
