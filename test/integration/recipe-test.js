/*
* Created by Andrew Hoskins
* Copyright 2017 ECE 492 Group 2 (Winter 2017), University of Alberta. All rights reserved.
*/

import request from 'supertest';
import chai from 'chai';
import mongoose from 'mongoose';
import app from '../../src/index.js';

const expect = chai.expect;

let recipeId = null;

before((done) => {
	request(app).post('/user') // need the dummy use for the /1/recipes endpoint
	.then(() => done());
});

after((done) => {
	mongoose.connection.db.dropDatabase();
	done();
});

describe('test recipe api endpoints', () => {
	it('should get recipes with certain parameters', (done) => {
		request(app).get('/recipes?ingredients=tomato%2Clettuce%2Cchedder+cheese')
		.expect(200)
		.end((err, res) => {
			recipeId = res.body.data[0].id;
			expect(res.body.data).to.be.an('array');
			expect(res.body.totalPages).to.equal(90);
			expect(res.body.page).to.equal(1);
			expect(res.body.data[0]).to.have.property('title');
			expect(res.body.data[0]).to.have.property('image');
			expect(res.body.data[0]).to.have.property('steps');
			expect(res.body.data[0]).to.have.property('sourceUrl');
			expect(res.body.data[0]).to.have.property('id');
			done();
		});
	});

	it('should get recipes for a given user', (done) => {
		request(app).get('/1/recipes')
		.expect(200)
		.end((err, res) => {
			expect(res.body.data).to.be.an('array');
			expect(res.body.totalPages).to.equal(90);
			expect(res.body.page).to.equal(1);
			expect(res.body.data[0]).to.have.property('title');
			expect(res.body.data[0]).to.have.property('image');
			expect(res.body.data[0]).to.have.property('steps');
			expect(res.body.data[0]).to.have.property('sourceUrl');
			expect(res.body.data[0]).to.have.property('id');
			done();
		});
	});

	it('should get recipes for a given user', (done) => {
		request(app).get(`/recipes/${recipeId}`)
		.expect(200)
		.end((err, res) => {
			expect(res.body).to.have.property('title');
			expect(res.body).to.have.property('image');
			expect(res.body).to.have.property('steps');
			expect(res.body).to.have.property('sourceUrl');
			expect(res.body).to.have.property('id');
			done();
		});
	});
});
