var mongoose = require("mongoose");

// referencing schema constructor
var Schema = mongoose.Schema;

// using schema constructor to make model of article documents
var ArticleConstructor = new Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  url: {
      type: String,
      required: true
  },
  saved: {
      type: Boolean,
      default: false
  },
  // note store the note id from the note documents
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// creating model from above schema
var Article = mongoose.model("Article", ArticleConstructor);

// Export the Article model
module.exports = Article;
