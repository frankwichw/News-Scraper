var router = require("express").Router;
var express = require("express");
var Models = require("../models");
var ArticleController = require("../controllers/fetch.js");

module.exports = function (app) {
    app.get("/", function(req, res){
        // db.Article.find({ saved: false }, function(error, articles) {
        //     if (error) {
        //     console.log(error);
        //     }
        //     else {
        //     res.render("index", articles);
        //     }
        // });
        ArticleController.findUnsavedArticles(function(data){
            console.log(data);
            res.render("index", data);
        });
    });

    app.get("/api/articles", function(req, res){
        ArticleController.findUnsavedArticles(function(data){
            console.log(data);
            res.json(data);
        });
    });
};