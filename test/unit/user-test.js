/*
* Created by Andrew Hoskins
* Copyright 2017 ECE 492 Group 2 (Winter 2017), University of Alberta. All rights reserved.
*/

import chai from 'chai';
import User from '../../src/models/user.js';

const expect = chai.expect;

describe('test user model validation', () => {
	it('requires deviceId to be field', (done) => {
		let user = new User({
			_id: 1,
			name: 'tom'
		});

		user.validate((err) => {
			expect(err).to.exist;
			done();
		});
	});
	it('requires name to be field', (done) => {
		let user = new User({
			_id: 1,
			deviceId: 100
		});

		user.validate((err) => {
			expect(err).to.exist;
			done();
		});
	});
	it('requires _id to be field', (done) => {
		let user = new User({
			name: 'tom',
			deviceId: 100
		});

		user.validate((err) => {
			expect(err).to.exist;
			done();
		});
	});
	it('is correct when both name and id fields', (done) => {
		let user = new User({
			_id: 1,
			name: 'tom',
			deviceId: 100
		});

		user.validate((err) => {
			expect(err).to.not.exist;
			done();
		});
	});
});