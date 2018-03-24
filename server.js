const express = require('express');
const app = express();
const http = require('http');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm','html'],
  index: "index.html"
};

mongoose.connect("mongodb://assignment3:cmpt218a3@ds123399.mlab.com:23399/a3db");
const db = mongoose.connection;

//db.on('error', function(){});
db.once('open', function(){
  console.log('connection success');
});

app.use('/', function(req,res,next){
  console.log(req.method, 'request:', req.url, JSON.stringify(req.body));
  next();
});

app.use('/', express.static('./pub_html', options));

http.createServer(app).listen(port);
console.log('running on port',port);