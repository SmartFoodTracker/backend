import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
	_id: {type: Number, required: true},
	name: {type: String, required: true},
	deviceId: {type: Number, required: true}
});

let User = mongoose.model('User', userSchema);

export default User;