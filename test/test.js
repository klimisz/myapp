process.env.NODE_ENV = 'test';


let express = require("express");
let app = require('../MVP');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);



describe('/GET data', () => {
	it('it should GET all examples', (done) => {
		chai.request('http://localhost:3000')
			.get('/Events')
			.end((err,res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(4);
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
				res.body.should.be.a('object');
				res.body.should.have.property('i').eql(newEvent.i);
				res.body.should.have.property('t');
				res.body.should.have.property('descr');
				res.body.should.have.property('d');
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
				res.body.should.be.a('object');
				res.body.should.have.property('i').eql(newEvent.i);
				res.body.should.have.property('t').eql(newEvent.t);
				res.body.should.have.property('descr').eql(newEvent.descr);
				res.body.should.have.property('d').eql(newEvent.d);
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
				res.body.should.have.property('i').eql(newEvent.i);
				res.body.should.have.property('t').eql(newEvent.t);
				res.body.should.have.property('descr').eql(newEvent.descr);
				res.body.should.have.property('d').eql(newEvent.d);
				done();
			});
	});
});

describe('/DELETE Event', () => {
	it('it should Delete an existing event', (done)=> {
		let newEvent = {i:'1', t:'testX', descr:'this is another test', d:'2017'}
		chai.request('http://localhost:3000')
			.delete('/Events/' + newEvent.i)
			.end((err,res) => {
				res.should.have.status(200);
				done();
			});
	});
});
			
			
			
			
			
			
			
			
			
			
			
			
			
			