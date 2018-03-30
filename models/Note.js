var mongoose = require("mongoose");

// referencing schema constructor
var Schema = mongoose.Schema;

// using schema constructor to make model of note documents
var NoteConstructor = new Schema({
  articleId: {
    type: String,
    required: true
  },
  body: {
      type: String,
      required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteConstructor);

// Export the Note model
module.exports = Note;
