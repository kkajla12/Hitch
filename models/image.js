var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
   filename: String,
   url: String,
   threadId: mongoose.Schema.ObjectId,
   date: { type: Date, default: Date.now },
   userId: String
});

module.exports = mongoose.model('Image', ImageSchema);
