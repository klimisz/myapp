const express = require('express');
const app = express();

const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient
	, assert = require('assert');
const url = 'mongodb://localhost:27017/myapp';

let Gdb = null;

MongoClient.connect(url,(err, db)=> {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  Gdb = db;
	
});

function AddNewEvent(req, db, callback) {
  let collection = db.collection('MVPTable');
  collection.insert({i:req.params.eventid, t:req.params.title, descr:req.params.description, d:req.params.date}, (err, result)=> {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted 1 Event into the collection");
    callback(result.ops);
  });
}

function SearchEvent(req,db,callback){
	let collection = db.collection('MVPTable');
		collection.find({'i': req.params.eventid}).toArray((err,results)=> {
			assert.equal(err,null);
			console.log("Found The Event");
			callback(results);
		});
	};

function RemoveEvent(req,db,callback){
	let collection = db.collection('MVPTable');
		collection.remove({'i' : req.params.eventid},true,(err,result)=> {
			assert.equal(err,null);
			assert.equal(1,result.result.n);
			console.log("Event Deleted");
			callback(result);
		});
}	

function UpdateExistingEvent(req,db,callback) {
	let collection = db.collection('MVPTable');
	collection.updateOne({'i': req.params.eventid},{'i': req.params.eventid,'t':req.params.title, 'descr':req.params.description, 'd':req.params.date},(err,result)=> {
		assert.equal(err,null);
		assert.equal(1, result.result.n);
		 callback(result);
	});
}				
	
function SearchAllEvents(db,callback){
	let collection = db.collection('MVPTable');
		collection.find({}).toArray((err,results)=> {
			assert.equal(err,null);
			console.log("Found All Events");
			callback(results);
		});
	};
	
app.listen(3000);
	
app.route('/Events/:eventid/:title/:description/:date')
	.put((req,res)=> {
		AddNewEvent(req,Gdb,(result,err)=>{
			console.log('Event Created Successfully');
			res.send(result);
		})
	})		
	.post((req,res)=> {
		UpdateExistingEvent(req,Gdb,(err,result)=>{
			console.log('Event Updated')
			res.send(result);
		});
	})
		
app.get('/Events' , (req,res) =>{
	SearchAllEvents(Gdb,(results,err)=>{
			res.send(results);
		})
	.catch((err)=>{
		console.log(err);
		res.send('An Error Occured');
	})
});	
app.route('/Events/:eventid')
	.get((req,res) => {
		SearchEvent(req,Gdb,(results,err)=>{
			res.send(results);
		});
	})
	
	.delete((req,res) => {
		RemoveEvent(req,Gdb,(result,err)=> {
			res.send('Event Deleted');
		});
	})		