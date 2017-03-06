/*
* Created by Andrew Hoskins
* Copyright 2017 ECE 492 Group 2 (Winter 2017), University of Alberta. All rights reserved.
*/

import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
	_id: {type: Number, required: true},
	name: {type: String, required: true},
	deviceId: {type: Number, required: true}
});

let User = mongoose.model('User', userSchema);

export default User;