import Item from '../models/item';

export function getInventory(req, res) {
	Item.find({}, (err, documents) => {
		if (err) {
			res.sendStatus(400);
		} else {
			res.send(documents);
		}
	});
}

export function deleteItem(req, res) {
	Item.findByIdAndRemove(req.params.itemId, (err, doc) => {
		if (err) {
			res.sendStatus(400);
		} else {
			getInventory(req, res);
		}
	});
}

export function createItem(req, res) {
	let item = new Item({
		title: req.body.title,
		quantity: req.body.quantity,
		units: req.body.units,
		timeAdded: new Date().getTime(),
		timeExpired: req.body.timeExpired
	});

	item.save((err) => {
		if (err) {
			res.sendStatus(400);
		} else {
			getInventory(req, res);
		}
	});
}

export function modifyItem(req, res) {
	Item.findByIdAndUpdate(req.params.itemId, { $set: req.body }, { runValidators: true }, (err, doc) => {
		if (err) {
			res.sendStatus(400);
		} else {
			getInventory(req, res);
		}
	});
}

export function getItem(req, res) {
	Item.findById(req.params.itemId, (err, doc) => {
		if (err) {
			res.sendStatus(400);
		} else {
			res.send(doc);
		}
	});
}
