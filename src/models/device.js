import mongoose from 'mongoose';

let deviceSchema = new mongoose.Schema({
	_id: {type: Number, required: true},
	name: {type: String, required: true}
});

let Device = mongoose.model('Device', deviceSchema);

export default Device;