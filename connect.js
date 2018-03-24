var mongoose = require('mongoose');

mongoose.connect("mongodb://assignment3:cmpt218a3@ds123399.mlab.com:23399/a3db");
var db = mongoose.connection;

//db.on('error', function(){});
db.once('open', function(){
  console.log('connection success');
});

const Schema = mongoose.Schema;

const checkString = new Schema ({
  name: String,
  date: { type: Date, default: Date.now },
  users: [{ studName: String, studNum: Number }]
});
