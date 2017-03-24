/*
* Created by Andrew Hoskins
* Copyright 2017 ECE 492 Group 2 (Winter 2017), University of Alberta. All rights reserved.
*/

import request from 'supertest';
import chai from 'chai';
import mongoose from 'mongoose';
import app from '../../src/index.js';

const expect = chai.expect;

const UNKNOWN = 'Unknown product';

describe('test barcode api endpoint', () => {
	it('should return unknown product when valid barcode but no matching items', (done) => {
		request(app).get('/barcode/100002000036')
		.expect(200)
		.end((err, res) => {
			expect(res.text).to.equal(UNKNOWN);
			done();
		});
	});
	it('should return unknown product when invalid barcode', (done) => {
		request(app).get('/barcode/123')
		.expect(200)
		.end((err, res) => {
			expect(res.text).to.equal(UNKNOWN);
			done();
		});
	});
	it('should return product name when valid barcode with matching item', (done) => {
		request(app).get('/barcode/028000521455')
		.expect(200)
		.end((err, res) => {
			expect(res.text).to.equal('Fruit Punch Juice Box,  8 - 6.75 fl oz boxes');
			done();
		});
	});
});
