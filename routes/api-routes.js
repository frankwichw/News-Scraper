// var router = express.Router();
var router = require("express").Router;
var express = require("express");

module.exports = function (app) {
app.get("/", function(req, res){
    res.render("index");
});
};