import request from 'supertest';
import mongoose from 'mongoose';
import chai from 'chai';
import app from '../src/index.js';

const expect = chai.expect;

let itemId = null;

after((done) => {
	mongoose.connection.db.dropDatabase();
	done();
});

describe('test inventory api endpoints', () => {
	it('should save an item', (done) => {
		request(app).put('/someId/inventory')
		.send({title: 'banana', quantity: 5, units: 'whole', dateAdded: new Date(), expiryDate: null})
		.expect(200)
		.end((err, res) => {
			expect(res.body).to.be.an('array');
			expect(res.body[0]['title']).to.equal('banana');
			done();
		});
	});
	it('should save a second item', (done) => {
		request(app).put('/someId/inventory')
		.send({title: 'milk', quantity: 2, units: 'l', dateAdded: new Date(), expiryDate: null})
		.expect(200)
		.end((err, res) => {
			expect(res.body).to.be.an('array');
			expect(res.body[1]['title']).to.equal('milk');
			expect(res.body.length).to.equal(2);
			done();
		})
	});
	it('should return all items', (done) => {
		request(app).get('/someId/inventory')
		.expect(200)
		.end((err, res) => {
			expect(res.body).to.be.an('array');
			expect(res.body.length).to.equal(2);
			expect(res.body[0]).to.have.property('title');
			expect(res.body[0]).to.have.property('quantity');
			expect(res.body[0]).to.have.property('units');
			expect(res.body[0]).to.have.property('dateAdded');
			expect(res.body[0]).to.have.property('expiryDate');
			done();

			itemId = res.body[0]._id;
		});
	});
	it('should return an item by id', (done) => {
		request(app).get(`/someId/inventory/${itemId}`)
		.expect(200)
		.end((err, res) => {
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('title');
			expect(res.body).to.have.property('quantity');
			expect(res.body).to.have.property('units');
			expect(res.body).to.have.property('dateAdded');
			expect(res.body).to.have.property('expiryDate');
			done();
		});
	});
	it('should edit an item by id', (done) => {
		request(app).put(`/someId/inventory/${itemId}`)
		.send({title: 'orange'})
		.expect(200)
		.end((err, res) => {
			expect(res.body).to.be.an('array');
			expect(res.body[0]['title']).to.equal('orange');
			done();
		});
	});
	it('should delete an item by id', (done) => {
		request(app).delete(`/someId/inventory/${itemId}`)
		.expect(200)
		.end((err, res) => {
			expect(res.body).to.be.an('array');
			expect(res.body.length).to.equal(1);
			done();
		});
	});	
});
