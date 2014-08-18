var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
   filename: String,
   url: String,
   threadId: mongoose.Schema.ObjectId,
   created: { type: Date, default: Date.now },
   userId: String
});

module.exports = mongoose.model('Image', ImageSchema);
