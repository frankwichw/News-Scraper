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
        })
    },
    saveArticle: function(query, callback){
        Article.update({_id: query.id}, {$set: {saved: true}}, {}, callback);
    },
    addNote: function(query, callback){
        console.log("query below");
        console.log(query);
        // Note.create(query, function(err, res){
        //     callback(err, res);
        // });

        // Note.create(query)
        //     .then(function(newNote) {  
        //         return Article.findOneAndUpdate({_id: newNote._articleId}, { $push: { notes: newNote._id } }, { new: true });
        // })
        //     .then(function(data) {
        //         callback(data);
        // })
        //     .catch(function(err) {
        //         callback(err);
        // });

        Note.create(query, function(err, res) {
            // Log any errors
            if (err) {
              console.log(err);
            }
            // Or just log the doc we saved
            else {
              console.log(res);
              // Place the log back in this callback function
              // so it can be used with other functions asynchronously
              callback(res);
            }
        });

        }
}