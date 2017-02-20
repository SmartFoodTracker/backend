import User from '../models/user';

export function newUser(req, res) {
	// stub for now with id: 1 and name: test and link to deviceId: 1
	let user = new User({
		_id: 1,
		name: 'test',
		deviceId: 1
	});

	user.save((err) => {
		if (err) {
			res.sendStatus(400);
		} else {
			res.sendStatus(200);
		}
	});
}