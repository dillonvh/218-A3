var express = require('express');
var app = express();
// var http = require('http');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var port = process.env.PORT || 26568;

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm','html'],
  index: "index.html"
};

//setup connection
mongoose.connect("mongodb://assignment3:cmpt218a3@ds123399.mlab.com:23399/a3db");
// mongoose.connect("mongodb://vberezny:NgnKc3fn@cmpt218.csil.sfu.ca:24/a3db");
var db = mongoose.connection;

db.once('open', function(){
  console.log('connection success');
});

//create Schema
var Schema = mongoose.Schema;

var checkString = new Schema ({
  name: String,
  open: Boolean,
  date: { type: Date, default: Date.now },
  users: [{ studName: String, studNum: Number }]
});

//create model
var CheckIn = mongoose.model('CheckIn', checkString);

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('./pub_html', options));

//initiates check-in
app.post('/start', function(req,res){
  console.log('entered /start');

  var check = req.body.string;
  CheckIn.create({name:check, open:true}, function(err){
    if(err) throw(err);
    res.send('Check-in created');
  });
});

//closes check-in
app.post('/stop', function(req,res){
  console.log('entered /stop');

  var check = req.body.string;
  CheckIn.findOne({'name':check, 'open':true}, function (err, obj) {
    if(err) throw(err);
    obj.open = false;
    obj.save();
    //respond w/obj
    res.send(JSON.stringify(obj.users));
  });
});

//allows users to check-in
app.post('/check-in', function(req,res){
  console.log('entered /check-in');

  var name = req.body.name;
  var num = req.body.id;
  var ustring = req.body.ustring;

  var user = {studName:name,studNum:num};

  CheckIn.findOne({'name':ustring, 'open':true}, function (err, obj) {
    if(err || obj===null){
      res.send('Invalid string entry, Check-in failed');
    }else{
      obj.users.push(user);
      obj.save();
      res.send('Checked in');
    }
  });
});

//retrieves full history
app.get('/history', function(req,res){
  console.log('entered /history');

  CheckIn.find({}, 'name users', function (err, docs) {
    if(err) throw(err);
    res.send(JSON.stringify(docs));
  });
});

app.listen(port);
console.log('running on port',port);