var router = require("express").Router;
var express = require("express");
var Models = require("../models");
var ArticleController = require("../controllers/fetch.js");

module.exports = function (app) {
    app.get("/", function(req, res){
        res.render("index");

    });

    app.get("/api/scrape", function(req, res){
        console.log("api/scrape");
        ArticleController.scrape(function(err, articles){
            console.log("\n\n------ articles below ------\n\n")
            console.log(articles);
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

    app.get("api/getarticles", function(req, res){
        console.log("api/getarticles");
        ArticleController.findUnsavedArticles(function(data){
            console.log(data);
            res.json(data);
        });
    })
};