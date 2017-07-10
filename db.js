const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {

});

let EventSchema = mongoose.Schema({
	id: String,
	title: String,
	description: String,
	date: String
});



EventSchema.methods.showTitle = ()=>{
	let TitleAppear = this.title 
	? "The title is " + this.title
	: "There is no title";
	console.log(TitleAppear);
}

let Event = mongoose.model('Event', EventSchema);

let Event1 = new Event({ id : '1' , title : 'test1', description : 'this is a test', date : '1992'});



Event1.save((err,Event1) => {
	if (err) return console.error(err);
	Event1.showTitle();
});
