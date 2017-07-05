const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Stuff = require('./stuff.js');
mongoose.connect('mongodb://127.0.0.1:27017/stuffdb');
app.use(express.static('./'));

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var stuff;

app.get('/', function(req, res) {
  res.render('stuff', {stuff});
});

app.post('/', function(req, res) {
  let stuff = new Stuff ({
    type : req.body.stuffType,
    title : req.body.stuffTitle,
    importanceFactor : req.body.stuffImpFactor
  });
  stuff.save().then(function() {
    console.log("Stuff saved to database!")
  }).catch(function() {
    console.log("Stuff NOT saved to database, bud!");
  });
  res.render('stuff', {stuff});
});

app.listen(3000, function(req, res) {
  console.log("Connected to port 3000 and ready to do some stuff!");
});
