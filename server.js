var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('emplist',['emplist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.get('/emplist', function(req,res){
	console.log("2.recieved GET request")
	db.emplist.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/emplist',function(req,res){
	 console.log(req.body);
	 db.emplist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/emplist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.emplist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/emplist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.emplist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/emplist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.emplist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, pos: req.body.pos, dept: req.body.dept, sal: req.body.sal}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");