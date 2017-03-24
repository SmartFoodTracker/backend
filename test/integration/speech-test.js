/*
* Created by Andrew Hoskins
* Copyright 2017 ECE 492 Group 2 (Winter 2017), University of Alberta. All rights reserved.
*/

import request from 'supertest';
import chai from 'chai';
import mongoose from 'mongoose';
import app from '../../src/index.js';
import fs from 'fs';

const expect = chai.expect;

const UNABLE = 'Unable to recognize';

describe('test speech api endpoint', () => {
	it('should return return the speech file as a string', (done) => {
		request(app).post('/speech/16000')
		.set('Content-Type', 'audio/wav')
		.send(fs.readFileSync('./bridge.raw'))
		.expect(200)
		.end((err, res) => {
			expect(res.text).to.equal('how old is the Brooklyn Bridge');
			done();
		});
	});
	it('should return unable to recognize when wrong sample rate given', (done) => {
		request(app).post('/speech/32000')
		.set('Content-Type', 'audio/wav')
		.send(fs.readFileSync('./bridge.raw'))
		.expect(200)
		.end((err, res) => {
			expect(res.text).to.equal(UNABLE);
			done();
		});
	});
	it('should return unable to recognize when sample rate not given because default is wrong sample rate', (done) => {
		request(app).post('/speech/')
		.set('Content-Type', 'audio/wav')
		.send(fs.readFileSync('./bridge.raw'))
		.expect(200)
		.end((err, res) => {
			expect(res.text).to.equal(UNABLE);
			done();
		});
	});
	it('should return 400 when speech file not given', (done) => {
		request(app).post('/speech/')
		.expect(400)
		.end((err, res) => {
			done();
		});
	});
});
