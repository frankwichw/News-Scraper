var scraper = require("../scripts/scrape.js");
var Article = require("../models/Headline.js");

module.exports = {
    scrape: function(callback){
        Scrape(function(data){
            var articleArray = data;
                
            Article.collection.insertMany(articleArray, function(err, res){
                console.log(res);
                callback(res);
            });
            
        });
    },
    read: function(query, callback){
        Article.find(query).then(function(err, res){
            console.log(res);
            callback(res);
        })
    },
    saveArticle: function(query, callback){
        Article.update({_id: query._id}, {$set: {saved: true}}, {}, callback);
    },
    findUnsavedArticles: function(callback){
        Article.find({saved: false}, function(err, res){
            callback(res);
        });
    }
}