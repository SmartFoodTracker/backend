import chai from 'chai';
import Item from '../src/models/item.js';

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
	}
];

function replace(check) {
	return (done) => {
		let item = new Item({
			title: undefined,
			quantity: 1,
			units: 'l',
			timeAdded: new Date().getTime(),
			timeExpired: null
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