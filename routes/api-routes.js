var router = require("express").Router;
var express = require("express");
var Models = require("../models");
var ArticleController = require("../controllers/fetch.js");

module.exports = function (app) {
    app.get("/", function(req, res){
        res.render("index");
    });

    app.get("/saved", function(req, res){
        res.render("saved");
    })

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
        ArticleController.read({saved: false}, function(data){
            res.json(data);
        });
    });

    app.get("/api/saved", function(req, res){
        ArticleController.read({saved: true}, function(data){
            res.json(data);
        });
    });

    app.put("/api/savearticle", function(req, res){
        ArticleController.saveArticle(req.body, function(res){
            console.log("article updated");
        })
    });

    app.post("/api/notes", function(req, res){
        ArticleController.addNote(req.body, function(data){
            res.json(data);
            console.log("note created");
        });
    })
};