/*
* Created by Andrew Hoskins
* Copyright 2017 ECE 492 Group 2 (Winter 2017), University of Alberta. All rights reserved.
*/

import chai from 'chai';
import Item from '../../src/models/item.js';

const expect = chai.expect;

const errorType = (key) => `should be invalid if ${key} is wrong data type`;
const errorMissing = (key) => `should be invalid if ${key} is missing`;

const checks = [
	{
		key: 'title',
		value: undefined,
		name: errorMissing('title')
	},
	{
		key: 'quantity',
		value: undefined,
		name: errorMissing('quantity')
	},
	{
		key: 'quantity',
		value: 'A lot',
		name: errorType('quantity')
	},
	{
		key: 'units',
		value: 'A lot',
		name: errorType('units')
	},
	{
		key: 'units',
		value: undefined,
		name: errorMissing('units')
	},
	{
		key: 'timeAdded',
		value: undefined,
		name: errorMissing('timeAdded')
	},
	{
		key: 'timeAdded',
		value: 'today',
		name: errorType('timeAdded')
	},
	{
		key: 'timeExpired',
		value: 'tomorrow',
		name: errorType('timeExpired')
	},
	{
		key: 'deviceId',
		value: undefined,
		name: errorMissing('deviceId')
	},
	{
		key: 'deviceId',
		value: 'happy',
		name: errorType('deviceId')
	}
];

function replace(check) {
	return (done) => {
		let item = new Item({
			title: 'banana',
			quantity: 1,
			units: 'l',
			timeAdded: new Date().getTime(),
			timeExpired: undefined,
			deviceId: 1
		});

		item[check.key] = check.value; 

		item.validate((err) => {
			expect(err).to.exist;
			expect(err.errors[check.key]).to.exist;
			done();
		});
	}
}

describe('test item model validation', () => {
	for (let check of checks) {
		it(check.name, replace(check));
	}
});