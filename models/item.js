import mongoose from 'mongoose';

let itemSchema = new mongoose.Schema({
	title: String,
	id: String,
	quantity: Number,
	units: String,
	dateAdded: Date,
	expiryDate: Date
});

let Item = mongoose.model('Items', itemSchema);

export default Item;
