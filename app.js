const express = require('express')
const app = express()
const fs = require('fs');

function readfileprom(filename){
	return new Promise(
		function(resolve,reject) {
			fs.readFile(filename,{ encoding: 'utf8' },
				(error,data) => {
					if (error) {
						reject(error);
					} else {
						resolve(data);
					}
				});
		});
}




app.get('/:userno', function (req, res, next) {
    
		readfileprom(req.params.userno)
			.then( data => {
				res.send(data);
				console.log('success');
			})
			.catch(next);
			
	
  });
app.use( function(err,req,res,next) {
	res.send("error");
	console.log(error);
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

/*app.post('/:username',function (req, res){
	res.send('Post REQ, Name is ' + req.params.username);
});

let param1 = function (req, res, next) {
	console.log('going to 2')
	next()
}

let param2 = function (req, res, next) {
	console.log('going to 3')
	next()
}

let param3 = function (req, res) {
	res.send('end of the line')
}

app.route('/')
	.delete(function(req,res){
	res.send('DELETED')
	})

	.put(function(req,res){
	res.send('PUTED')
	})
	
	.get([param1, param2, param3])
	
	.post(function(req,res) {
		res.send('Simple Post REQ')
	})

*/
