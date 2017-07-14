process.env.NODE_ENV = 'test';


let express = require("express");
let app = require('../MVPwDB');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(require('chai-things'));
chai.use(chaiHttp);

const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient
	, assert = require('assert');
const url = 'mongodb://localhost:27017/myapp';

describe('Events', () => {
		MongoClient.connect(url, function(err, db) {
				assert.equal(null, err);
				console.log("Connected successfully to server");
				let collection = db.collection('MVPTable');
				collection.insert({i:'2', t:'test2', descr:'this is another test', d:'1993'}, (err) => { 
				db.close();
			});
		});    
    });

describe('/GET data', () => {
	it('it should GET all examples', (done) => {
		chai.request('http://localhost:3000')
			.get('/Events')
			.end((err,res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.above(0);
				res.body.should.include.something.that.have.property('i');
				res.body.should.include.something.that.have.property('t');
				res.body.should.include.something.that.have.property('descr');
				res.body.should.include.something.that.have.property('d');
				done();
			});
		});	
	});

describe('/GET data', () => {
	it('it should GET a specific Event by ID', (done) => {
		let newEvent = {i:'2', t:'test2', descr:'this is another test', d:'1993'}
		chai.request('http://localhost:3000')
			.get('/Events/' + newEvent.i)
			.end((err,res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.should.include.something.that.have.property('i', newEvent.i);
				res.body.should.include.something.that.have.property('t');
				res.body.should.include.something.that.have.property('descr');
				res.body.should.include.something.that.have.property('d');
				done();
			});
	});
});

describe('/PUT Event', () => {
	it('it should PUT a new event', (done)=> {
		let newEvent = {i:'10', t:'testX', descr:'this is another test', d:'2017'}
		chai.request('http://localhost:3000')
			.put('/Events/' + newEvent.i + "/" + newEvent.t + "/" + newEvent.descr + "/" + newEvent.d)
			.end((err,res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.should.have.length(1);
				res.body.should.include.something.that.have.property('i', newEvent.i);
				res.body.should.include.something.that.have.property('t', newEvent.t);
				res.body.should.include.something.that.have.property('descr', newEvent.descr);
				res.body.should.include.something.that.have.property('d', newEvent.d);
				done();
			});
	});
});
	
			
describe('/POST Event', () => {
	it('it should POST update a new event', (done)=> {
		let newEvent = {i:'10', t:'testX', descr:'this is another test', d:'2017'}
		chai.request('http://localhost:3000')
			.post('/Events/' + newEvent.i + "/" + newEvent.t + "/" + newEvent.descr + "/" + newEvent.d)
			.end((err,res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('nModified').eql(1);
				done();
			});
	});
});

describe('/GET data', () => {
	it('it should GET a specific Event by Title', (done) => {
		let newEvent = {i:'2', t:'test2', descr:'this is another test', d:'1993'}
		chai.request('http://localhost:3000')
			.get('/Events/Title/' + newEvent.t)
			.end((err,res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.should.include.something.that.have.property('i');
				res.body.should.include.something.that.have.property('t', newEvent.t);
				res.body.should.include.something.that.have.property('descr');
				res.body.should.include.something.that.have.property('d');
				done();
			});
	});
});

describe('/DELETE Event', () => {
	it('it should Delete an existing event', (done)=> {
		let newEvent = {i:'2', t:'test2', descr:'this is another test', d:'1993'}
		chai.request('http://localhost:3000')
			.delete('/Events/' + newEvent.i)
			.end((err,res) => {
				res.should.have.status(200);
				res.body.should.have.property('n').to.be.above(0);
				done();
			});
	});
});			
			
			
			
			
			
			
			
			
			
			
			
			