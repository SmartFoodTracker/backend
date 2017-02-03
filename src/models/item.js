import mongoose from 'mongoose';

let itemSchema = new mongoose.Schema({
	title: String,
	id: String,
	quantity: Number,
	units: String,
	timeAdded: Number,
	expiryTime: Number
});

let Item = mongoose.model('Items', itemSchema);

export default Item;
