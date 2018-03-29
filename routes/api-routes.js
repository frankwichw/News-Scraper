var router = require("express").Router;
var express = require("express");
var Models = require("../models");
var ArticleController = require("../controllers/fetch.js");

module.exports = function (app) {
    app.get("/", function(req, res){
        res.render("index");
    });

    app.get("/api/scrape", function(req, res){
        ArticleController.scrape(function(err, articles){
            if(articles) {
                res.json({
                    response: "Scraped " + articles.insertedCount + " articles!"
                })
            } else {
                res.json({
                    response: "Couldn't find any new articles!"
                });
            }

        });
    });

    app.get("/api/unsaved", function(req, res){
        ArticleController.read(function(err, data){
            console.log(data);
            res.json(data);
        });
    });
};