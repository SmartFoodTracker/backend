import Item from '../models/item';

/**
* @api {get} /:deviceId/inventory Get All Inventory For Device
* @apiGroup Inventory
*
* @apiParam (required) {String} deviceId pass any string for now
* @apiSuccessExample {json} Success-Response: all items in inventory
*		[
*			{
*				title: 'apple',
*				quantity: 2,
*				...
*			}
*			...
*		] 
*/
export function getInventory(req, res) {
	Item.find({}, (err, documents) => {
		if (err) {
			res.sendStatus(400);
		} else {
			res.send(documents);
		}
	});
}

/**
* @api {delete} /:deviceId/inventory/:itemId Delete Item
* @apiGroup Inventory
*
* @apiParam (required) {String} deviceId pass any string for now
* @apiParam (required) {String} itemId inventory item unique id
* @apiSuccessExample {json} Success-Response: all items in inventory
*		[
*			{
*				title: 'apple',
*				quantity: 2,
*				...
*			}
*			...
*		] 
*/
export function deleteItem(req, res) {
	Item.findByIdAndRemove(req.params.itemId, (err, doc) => {
		if (err) {
			res.sendStatus(400);
		} else {
			getInventory(req, res);
		}
	});
}


/**
* @api {put} /:deviceId/inventory Add Item To Inventory
* @apiGroup Inventory
*
* @apiParam (required) {String} deviceId pass any string for now
* @apiParam (body) {Object} item item to add to the inventory
* @apiParamExample {json} Request-Body-Example:
*		{
*			title: 'apple',
			quantity: 2,
			units: 'whole',
			timeAdded: 1487568006,
			timeExpired: 1487742114
*		}
*
* @apiSuccessExample {json} Success-Response: all items in inventory
*		[
*			{
*				title: 'apple',
*				quantity: 2,
*				...
*			}
*			...
*		] 
*/
export function createItem(req, res) {
	let item = new Item({
		title: req.body.title,
		quantity: req.body.quantity,
		units: req.body.units,
		timeAdded: new Date().getTime(),
		timeExpired: req.body.timeExpired,
		deviceId: req.params.deviceId
	});

	item.save((err) => {
		if (err) {
			res.sendStatus(400);
		} else {
			getInventory(req, res);
		}
	});
}

/**
* @api {put} /:deviceId/inventory/:itemId Modify Item In Inventory
* @apiGroup Inventory
*
* @apiParam (required) {String} deviceId pass any string for now
* @apiParam (required) {String} itemId inventory item unique id to modify
* @apiParam (body) {Object} item fields of item to update
* @apiSuccessExample {json} Success-Response: all items in inventory
*		[
*			{
*				title: 'apple',
*				quantity: 2,
*				...
*			}
*			...
*		] 
*/
export function modifyItem(req, res) {
	Item.findByIdAndUpdate(req.params.itemId, { $set: req.body }, { runValidators: true }, (err, doc) => {
		if (err) {
			res.sendStatus(400);
		} else {
			getInventory(req, res);
		}
	});
}

/**
* @api {get} /:deviceId/inventory/:itemId Get Single Item
* @apiGroup Inventory
*
* @apiParam (required) {String} deviceId pass any string for now
* @apiParam (required) {String} itemId inventory item unique id
* @apiSuccessExample {json} Success-Response: item requested
*			{
*				title: 'apple',
*				quantity: 2,
*				...
*			}
*/
export function getItem(req, res) {
	Item.findById(req.params.itemId, (err, doc) => {
		if (err) {
			res.sendStatus(400);
		} else {
			res.send(doc);
		}
	});
}
