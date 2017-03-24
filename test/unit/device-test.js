/*
* Created by Andrew Hoskins
* Copyright 2017 ECE 492 Group 2 (Winter 2017), University of Alberta. All rights reserved.
*/

import chai from 'chai';
import Device from '../../src/models/device.js';

const expect = chai.expect;

describe('test device model validation', () => {
	it('requires id to be field', (done) => {
		let device = new Device({
			name: 'tom'
		});

		device.validate((err) => {
			expect(err).to.exist;
			done();
		});
	});
	it('requires name to be field', (done) => {
		let device = new Device({
			_id: 1
		});

		device.validate((err) => {
			expect(err).to.exist;
			done();
		});
	});
	it('is correct when both name and id fields', (done) => {
		let device = new Device({
			_id: 1,
			name: 'tom'
		});

		device.validate((err) => {
			expect(err).to.not.exist;
			done();
		});
	});
});