import Device from '../models/device';

export function newDevice(req, res) {
	// stub for now with id: 1 and name: test
	let device = new Device({
		_id: 1,
		name: 'test'
	});

	device.save((err) => {
		if (err) {
			res.sendStatus(400);
		} else {
			res.sendStatus(200);
		}
	});
}