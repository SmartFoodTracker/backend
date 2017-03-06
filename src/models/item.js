/*
* Created by Andrew Hoskins
* Copyright 2017 ECE 492 Group 2 (Winter 2017), University of Alberta. All rights reserved.
*/

import mongoose from 'mongoose';

let itemSchema = new mongoose.Schema({
	title: {type: String, required: true},
	quantity: {type: Number, required: true},
	units: {type: String, enum: ['kg', 'lb', 'l', 'whole'], required: true},
	timeAdded: {type: Number, required: true},
	timeExpired: {type: Number},
	deviceId: {type: Number, required: true}
});

let Item = mongoose.model('Items', itemSchema);

export default Item;
