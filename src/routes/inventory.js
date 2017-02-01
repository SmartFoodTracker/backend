import Item from '../models/item';

export function getInventory(req, res) {
	Item.find({}, (err, documents) => {
		if (!err) {
			res.send(documents);
		} else {
			res.send('error');
		}
	});
}

export function deleteItem(req, res) {
	Item.findByIdAndRemove(req.params.itemId, (err, doc) => {
		if (err) {
			res.send(err);
		} else {
			res.send('successfully removed item');
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
			res.send(err);
		} else {
			res.send('successfully added to database');
		}
	});
}

export function modifyItem(req, res) {
	Item.findByIdAndUpdate(req.params.itemId, { $set: req.body }, { new: true }, (err, tank) => {
		if (err) res.send(err);
		res.send(tank);
	});
}