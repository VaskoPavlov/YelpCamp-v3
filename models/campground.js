var mongoose = require("mongoose");
var module = require("module");
var path = require("path");
// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
});

module.exports = mongoose.model("Campground", campgroundSchema);