/*
* Created by Andrew Hoskins
* Copyright 2017 ECE 492 Group 2 (Winter 2017), University of Alberta. All rights reserved.
*/

import Item from '../models/item';

/**
* @api {get} /:deviceId/inventory Get All Inventory For Device
* @apiGroup Inventory
*
* @apiParam (required) {String} deviceId pass any string for now
* @apiSuccessExample {json} Success-Response: all items in inventory
*		[
*			{
*				"title": "apple",
*				"quantity": 2,
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
* @api {delete} /:deviceId/inventory/:itemId Delete Item By Id
* @apiGroup Inventory
*
* @apiParam (required) {String} deviceId pass any string for now
* @apiParam (required) {String} itemId inventory item unique id
* @apiSuccessExample {json} Success-Response: all items in inventory
*		[
*			{
*				"title": "apple",
*				"quantity": 2,
*				...
*			}
*			...
*		] 
*/
export function deleteItemById(req, res) {
	Item.findByIdAndRemove(req.itemId || req.params.itemId, (err, doc) => {
		if (err) {
			res.sendStatus(400);
		} else {
			getInventory(req, res);
		}
	});
}


/**
* @api {delete} /:deviceId/inventory/title/:itemTitle Delete Item By Title
* @apiGroup Inventory
*
* @apiParam (required) {String} deviceId pass any string for now
* @apiParam (required) {String} itemTitle inventory item name string
* @apiSuccessExample {json} Success-Response: all items in inventory
*		[
*			{
*				"title": "apple",
*				"quantity": 2,
*				...
*			}
*			...
*		] 
*/
export function deleteItemByTitle(req, res) {
	Item.findOneAndRemove({ title: req.params.itemTitle.toLowerCase() }, (err, doc) => {
		if (err) {
			res.sendStatus(400);
		} else {
			getInventory(req, res);
		}
	});
}


/**
* @api {put} /:deviceId/inventory Add Item To Inventory
* @apiDescription Note: body is JSON of fields in item. If "title" field value already exists, will modify existing item. In this case,
* the value of the "inventory" field will increment, other fields will overwrite. If increment of inventory field results in 0, item will be deleted.
* 
* @apiGroup Inventory
*
* @apiParam (required) {String} deviceId pass any string for now
* @apiParam (body) {Object} item item to add to the inventory
* @apiParamExample {json} Request-Body-Example:
*		{
*			"title": "apple",
			"quantity": 2,
			"units": "whole",
			"timeAdded": 1487568006,
			"timeExpired": 1487742114
*		}
*
* @apiSuccessExample {json} Success-Response: all items in inventory
*		[
*			{
*				"title": "apple",
*				"quantity": 2,
*				...
*			}
*			...
*		] 
*/
export function createItem(req, res) {
	// if item exists call modifyItem(), otherwise save new inventory item
	Item.find({ title: req.body.title.toLowerCase() }, (err, documents) => {
		if (err) {
			res.sendStatus(400);

		} else if (documents.length) {
			req.itemId = documents[0]._id;
			modifyItem(req, res);

		} else {
			let item = new Item({
				title: req.body.title.toLowerCase(),
				quantity: req.body.quantity,
				units: req.body.units,
				timeAdded: new Date().getTime(),
				timeExpired: req.body.timeExpired,
				deviceId: 1
			});

			item.save((err) => {
				if (err) {
					res.sendStatus(400);
				} else {
					getInventory(req, res);
				}
			});
		}
	});
}

/**
* @api {put} /:deviceId/inventory/:itemId Modify Item In Inventory
* @apiGroup Inventory
* @apiDescription Note: body is JSON of fields to update. "inventory" field value will increment, others will overwrite. If increment
* of inventory field results in 0, item will be deleted.
*
* @apiParam (required) {String} deviceId pass any string for now
* @apiParam (required) {String} itemId inventory item unique id to modify
* @apiParam (body) {Object} item fields of item to update (inventory field value will increment, others will overwrite)
* @apiSuccessExample {json} Success-Response: all items in inventory
*		[
*			{
*				"title": "apple",
*				"quantity": 2,
*				...
*			}
*			...
*		] 
*/
export function modifyItem(req, res) {
	Item.findById(req.itemId || req.params.itemId, (err, doc) => {
		if (err) res.sendStatus(400);

		// increment quantity by diff, overwrite other fields
		Object.keys(req.body).forEach((key) => {
			if (key === 'quantity') {
				doc.quantity += req.body.quantity;
			} else {
				doc[key] = req.body[key];
			}
		});

		// delete item if zero quantity, otherwise save
		if (doc.quantity === 0) {
			req.itemId = doc._id;
			deleteItemById(req, res);
		} else {
			doc.save((err, updatedDoc) => {
				if (err) {
					res.sendStatus(400);
				} else {
					getInventory(req, res);
				}
			});
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
*				"title": "apple",
*				"quantity": 2,
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
