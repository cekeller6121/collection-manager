console.log("Connected to stuff.js");

const mongoose = require('mongoose');

const stuffSchema = new mongoose.Schema({

  type: {type: String, default: "New Stuff Item"},
  title: {type: String, default: "New Stuff Title"},
  importanceFactor: {type: Number, min: 1, max: 5}

});

const Stuff = mongoose.model('Stuff', stuffSchema);

module.exports = Stuff;
