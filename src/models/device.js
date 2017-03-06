/*
* Created by Andrew Hoskins
* Copyright 2017 ECE 492 Group 2 (Winter 2017), University of Alberta. All rights reserved.
*/

import mongoose from 'mongoose';

let deviceSchema = new mongoose.Schema({
	_id: {type: Number, required: true},
	name: {type: String, required: true}
});

let Device = mongoose.model('Device', deviceSchema);

export default Device;