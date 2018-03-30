var Scraper = require("../scripts/scrape.js");
var Article = require("../models/Headline.js");

module.exports = {
    scrape: function(callback){
        Scraper(function(data){
            var articleArray = data;

            Article.collection.insertMany(articleArray, function(err, res){
                callback(err, res);
            });
            
        });
    },
    read: function(query, callback){
        Article.find(query).then(function(res){
            callback(res);
        })
    },
    saveArticle: function(query, callback){
        Article.update({_id: query.id}, {$set: {saved: true}}, {}, callback);
    }
}