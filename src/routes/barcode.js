/*
* Created by Andrew Hoskins
* Copyright 2017 ECE 492 Group 2 (Winter 2017), University of Alberta. All rights reserved.
*/

import request from 'request';

/**
* @api {get} /barcode/:code Get Barcode Item Name
* @apiGroup Barcode
*
* @apiParam (required) {String} code the barcode 			
*/
export function parseBarcode(req, res) {
	const key = 'e2a3f4e45a2523d43526f73562461366';
	const barcode = req.params.code;

	res.set('Connection', 'close');

	request(`https://api.outpan.com/v2/products/${barcode}?apikey=${key}`, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			res.send(JSON.parse(body).name);
		} else {
			res.send('Unknown product');
		}
	});
}