import mongoose from 'mongoose';

let itemSchema = new mongoose.Schema({
	title: {type: String, required: true},
	quantity: {type: Number, required: true},
	units: {type: String},
	timeAdded: {type: Number, required: true},
	timeExpired: {type: Number}
});

let Item = mongoose.model('Items', itemSchema);

export default Item;
