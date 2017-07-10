const MongoClient = require('mongodb').MongoClient
	, assert = require('assert');
	
const url = 'mongodb://localhost:27017/myapp';

MongoClient.connect(url, (err,db)=> {
	assert.equal(null,err);
	console.log("Connected successfully to server");
	insertDocuments(db, ()=> {
    db.close();
  });
});

let insertDocuments =(db,callback)=> {
	
	let collection= db.collection('testTable');
	
	collection.insertMany([{a : 1}, {a : 2}, {a : 3}],(err,result)=> {
		assert.equal(err,null);
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);
		console.log("Inserted 3 documents into the collection");
		callback(result);
	});
}