import request from 'supertest';
import mongoose from 'mongoose';
import chai from 'chai';
import app from '../../src/index.js';

const expect = chai.expect;

let itemId = null;

after((done) => {
	mongoose.connection.db.dropDatabase();
	done();
});

describe('test inventory api endpoints', () => {
	it('should save an item', (done) => {
		request(app).put('/1/inventory')
		.send({title: 'banana', quantity: 5, units: 'whole', timeAdded: new Date().getTime(), timeExpired: null})
		.expect(200)
		.end((err, res) => {
			expect(res.body).to.be.an('array');
			expect(res.body[0]['title']).to.equal('banana');
			done();
		});
	});
	it('should save a second item', (done) => {
		request(app).put('/1/inventory')
		.send({title: 'milk', quantity: 2, units: 'l', timeAdded: new Date().getTime(), timeExpired: null})
		.expect(200)
		.end((err, res) => {
			expect(res.body).to.be.an('array');
			expect(res.body[1]['title']).to.equal('milk');
			expect(res.body.length).to.equal(2);
			done();
		})
	});
	it('should edit the existing item when attempting to save item existing', (done) => {
		request(app).put('/1/inventory')
		.send({title: 'banana', quantity: 1, units: 'l', timeAdded: new Date().getTime(), timeExpired: null})
		.expect(200)
		.end((err, res) => {
			expect(res.body).to.be.an('array');
			expect(res.body[0]['title']).to.equal('banana');
			expect(res.body[0]['quantity']).to.equal(1);
			expect(res.body.length).to.equal(2);
			done();
		})
	});
	it('should return all items', (done) => {
		request(app).get('/1/inventory')
		.expect(200)
		.end((err, res) => {
			expect(res.body).to.be.an('array');
			expect(res.body.length).to.equal(2);
			expect(res.body[0]).to.have.property('title');
			expect(res.body[0]).to.have.property('quantity');
			expect(res.body[0]).to.have.property('units');
			expect(res.body[0]).to.have.property('timeAdded');
			expect(res.body[0]).to.have.property('timeExpired');
			done();

			itemId = res.body[0]._id;
		});
	});
	it('should return an item by id', (done) => {
		request(app).get(`/1/inventory/${itemId}`)
		.expect(200)
		.end((err, res) => {
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('title');
			expect(res.body).to.have.property('quantity');
			expect(res.body).to.have.property('units');
			expect(res.body).to.have.property('timeAdded');
			expect(res.body).to.have.property('timeExpired');
			done();
		});
	});
	it('should edit an item by id', (done) => {
		request(app).put(`/1/inventory/${itemId}`)
		.send({title: 'orange'})
		.expect(200)
		.end((err, res) => {
			expect(res.body).to.be.an('array');
			expect(res.body[0]['title']).to.equal('orange');
			done();
		});
	});
	it('should delete an item by id', (done) => {
		request(app).delete(`/1/inventory/${itemId}`)
		.expect(200)
		.end((err, res) => {
			expect(res.body).to.be.an('array');
			expect(res.body.length).to.equal(1);
			done();
		});
	});	
	it('should delete an item by title', (done) => {
		request(app).delete('/1/inventory/title/banana')
		.expect(200)
		.end((err, res) => {
			expect(res.body).to.be.an('array');
			expect(res.body.length).to.equal(1);
			done();
		});
	});	
});
