const express = require('express');
const app = express();

const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient
	, assert = require('assert');
const url = 'mongodb://localhost:27017/myapp';


let Gdb = null;

MongoClient.connect(url,(err, db)=> {
  try
	{
		assert.equal(null, err);
		console.log("Connected successfully to server");
		Gdb = db;
	}
	catch(err){
		console.log('Error Connecting to Database');
		console.log(err);
	}

	
});

function AddNewEvent(req, callback) {
  let collection = Gdb.collection('MVPTable');
	try 
		{
			collection.insert({i:req.params.eventid, t:req.params.title, descr:req.params.description, d:req.params.date}, (err, result)=> {
			console.log("Inserted 1 Event into the collection");
			callback(result.ops);
			});
		}
		catch(err){
			console.log('Error Inserting Events into the collection');
			callback();
		}
}

function SearchEvent(req,callback){
	let collection = Gdb.collection('MVPTable');
	try {
			collection.find({'i': req.params.eventid}).toArray((err,results)=> {
				if (results.length>0){
					console.log("Found The Event");
					callback(results);
				}else{
					console.log("Error Finding Event");
					callback();
				}
			});	
	}catch(err){
		console.log('Error Querying Database');
		callback();
	}
};

function RemoveEvent(req,callback){
	let collection = Gdb.collection('MVPTable');
	try {
		collection.remove({'i' : req.params.eventid},true,(err,result)=> {
			if(result.result.n==1){
			console.log('Event Deleted');
			callback(result);
			}else{
				console.log('Error Deleting Event');
				callback();
			}
		});
	}
	catch(err){
		console.log('Error Querying Database');
		callback();
	};
}	
function UpdateExistingEvent(req,callback) {
	let collection = Gdb.collection('MVPTable');
	try {
		collection.updateOne({'i': req.params.eventid},{'i': req.params.eventid,'t':req.params.title, 'descr':req.params.description, 'd':req.params.date},(err,result)=> {
			if (result.result.n==1){
				callback(result);
				console.log('Event Updated Successfully');
			}else{
				console.log('Error Updating Event');
				callback();
			}
		});
	}
	catch(err){
		console.log('Error Querying Database');
		callback();
	}
}				
	
function SearchAllEvents(callback){
	let collection = Gdb.collection('MVPTable');
	try {
		collection.find({}).toArray((err,results)=> {
		console.log("Found All Events");
		callback(results);
		});
	}
	catch(err){
		console.log('Error Querying Database');
	}
};

function SearchEventByTitle(req,callback){
	let collection = Gdb.collection('MVPTable');
	try {
			collection.find({$and: [{'t':req.params.title}, {'t': {$ne: null}}]}).toArray((err,results)=> {
				if (results.length>0){
					console.log("Found The Event");
					callback(results);
				}else{
					console.log("Error Finding Event");
					callback();
				}
			});	
	}catch(err){
		console.log('Error Querying Database');
		callback();
	}
};

app.listen(3000);
	
app.route('/Events/:eventid/:title/:description/:date')
	.put((req,res)=> {
		AddNewEvent(req,(results)=>{
			if (results!=null){
				res.send(results);
				console.log('Event Created Successfully');
			}else{
				res.send('Error Creating New Event')
			}
		})
	})		
	.post((req,res)=> {
		UpdateExistingEvent(req,(results)=>{
			if(results!=null){
				res.send('Event Updated Successfully');
			}else{
				res.send('Error Updating Event');
			}
		});
	})
		
app.get('/Events' , (req,res) =>{
	SearchAllEvents((results)=>{
			if(results!=null){
				res.send(results);
			}else{
				res.send('Error Finding Events');
			}
		})	
});	
app.route('/Events/:eventid')
	.get((req,res) => {
		SearchEvent(req,(results)=>{
			if(results!=null){
				res.send(results);
			}else{
				res.send('Error Finding Event');
			}
		});
	})
	
	.delete((req,res) => {
		RemoveEvent(req,(results)=> {
			if(results!=null){
				res.send('Event Deleted');
			}else{
				res.send('Error Deleting Event');
			}
		});
	})		

app.get('/Events/Title/:title',(req,res)=> {
	SearchEventByTitle(req,(results)=>{
			if(results!=null){
				res.send(results);
			}else{
				res.send('Error Finding Event');
			}
		});
	})
	