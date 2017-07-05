const express = require('express');
const app = express();

let ArrayTop = new Array();
let newEvent = {i:null, t:null, descr:null, d:null}

ArrayTop[0]={i:'1', t:'test1', descr:'this is a test', d:'1992'};
ArrayTop[1]={i:'2', t:'test2', descr:'this is another test', d:'1993'};
ArrayTop[2]={i:'3', t:'test3', descr:'this is another test', d:'1994'};
ArrayTop[3]={i:'4', t:'test4', descr:'this is another test', d:'1995'};


function AddNewEvent(id,title,description,date) {
	return new Promise((resolve,reject)=>{
	newEvent = {i:id, t:title, descr:description, d:date}
	ArrayTop.push(newEvent)
	if (ArrayTop[ArrayTop.length-1]==newEvent){
		resolve("Data Added Successfully");
	}else{
		reject(error);
	}
	})};

function UpdateExistingEvent(id,title,description,date) {
	return new Promise((resolve,reject)=>{
	newEvent = {i:id, t:title, descr:description, d:date}
	for (let j = 0; j < ArrayTop.length; j++){
		if (id == ArrayTop[j].i){
			ArrayTop[j]= newEvent;
			resolve("Data Update Successfully");
		}
	}
	reject(error);
	});
}			
			
			
app.listen(3000);
	
app.route('/Events/:eventid/:title/:description/:date')
	.put((req,res)=> {
		AddNewEvent(req.params.eventid,req.params.title,req.params.description,req.params.date)
		.then(result =>{
		res.send(result);
		})
		.catch(error=> {
			res.send('Error Creating New Event')
			console.log(error)
		});
		})
	.post((req,res)=> {
		UpdateExistingEvent(req.params.eventid,req.params.title,req.params.description,req.params.date)
		.then(result =>{
		res.send(result);
		})
		.catch(error=> {
			res.send('Error Updating Event')
			console.log(error)
		});			
		})
		
		
app.get('/Events' , (req,res) =>{
	res.send(ArrayTop);
});

function SearchEvent(req){
	return new Promise((resolve,reject)=> {
	for (let j = 0; j < ArrayTop.length; j++) {
			if (ArrayTop[j].i == req.params.eventid ){
				resolve(j);
			
			}
	}
		reject('Event not found');
})};

function SpliceEvent(req){
	return new Promise((resolve,reject)=>{
		SearchEvent(req)
		.then(result => {
			let AL = ArrayTop.length
			ArrayTop.splice(result,1)
			if (ArrayTop.length == AL) {
				reject('Error! Event Not Deleted')
			}else{
				resolve('Event Deleted')
			}
		})
		.catch(error=>{
			reject('Error Finding Event');
			console.log(error);
		})
	})
}
	
app.route('/Events/:eventid')
	.get((req,res) => {
		SearchEvent(req)
		.then(result => {
			res.send(ArrayTop[result]);
		})
		.catch(error=>{
			res.send('Error Finding Event');
			console.log(error);
		})
	})	
.delete((req,res) => {
		SpliceEvent(req)
			.then(result => {
				res.send(result)
			})
			.catch(error=>{
			res.send('Error Deleting Event');
				console.log(error);
			})
	})		
	


	
	