/*
* Created by Andrew Hoskins
* Copyright 2017 ECE 492 Group 2 (Winter 2017), University of Alberta. All rights reserved.
*/

import Device from '../models/device';

/**
* @api {post} /device Create Device
* @apiGroup Device
* @apiDescription stubbed for now
*/
export function newDevice(req, res) {
	// stub for now with id: 1 and name: test
	let device = new Device({
		_id: 1,
		name: 'test'
	});

	device.save((err) => {
		if (err) {
			res.sendStatus(400);
		} else {
			res.sendStatus(200);
		}
	});
}