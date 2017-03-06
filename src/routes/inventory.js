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
	Item.findByIdAndRemove(req.params.itemId, (err, doc) => {
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
* @apiDescription Note: will update item (having same affect as PUT '/:deviceId/inventory/:itemId') if title already exists in inventory
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
*
* @apiParam (required) {String} deviceId pass any string for now
* @apiParam (required) {String} itemId inventory item unique id to modify
* @apiParam (body) {Object} item fields of item to update
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
	Item.findByIdAndUpdate(req.itemId || req.params.itemId, { $set: req.body }, { runValidators: true }, (err, doc) => {
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
