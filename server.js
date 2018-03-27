var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

// requiring models
var db = require("./models");

// initializing express
var app = express();

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// requiring handlebars
var exphbs = require("express-handlebars");
// user handlebars to default to main layout
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsScraperdb");



app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});