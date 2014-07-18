var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
   content: String,
   likes: { type: Number, default: 0 },
   created: { type: Date, default: Date.now },
   threadId: mongoose.Schema.ObjectId,
   userId: String
});

module.exports = mongoose.model('Comment', CommentSchema);
