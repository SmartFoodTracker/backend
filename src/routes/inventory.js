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
			res.sendStatus(200);
		}
	});
}

export function createItem(req, res) {
	let item = new Item({
		title: req.body.title,
		quantity: req.body.quantity || 1,
		units: req.body.units || '',
		dateAdded: req.body.dateAdded || new Date(),
		expiryDate: req.body.expiryDate || null
	});

	item.save((err) => {
		if (err) {
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	});
}

export function modifyItem(req, res) {
	Item.findByIdAndUpdate(req.params.itemId, { $set: req.body }, { new: true }, (err, tank) => {
		if (err) res.send(err);
		res.send(tank);
	});
}