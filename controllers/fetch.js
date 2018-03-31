var Scraper = require("../scripts/scrape.js");
var Article = require("../models/Headline.js");
var Note = require("../models/Note.js");

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
        });
    },
    saveArticle: function(query, callback){
        Article.update({_id: query.id}, {$set: {saved: true}}, {}, callback);
    },
    addNote: function(query, callback){
        console.log("query below");
        console.log(query);

        Note.create(query)
            .then(function(newNote) {  
                Article.findOneAndUpdate({_id: newNote.articleId}, { $set: { note: newNote._id } }, { new: true });
        })
            .then(function(data) {
                callback(data);
        })
            .catch(function(err) {
                callback(err);
        });
    },
    populateNotes: function(query, callback){
        Article.findOne({_id: query})
            .populate("note")
            .then(function(newArticle) {
                callback(newArticle);
        });
    }
    
}