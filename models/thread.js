var mongoose = require('mongoose');

var ThreadSchema = new mongoose.Schema({
   title: String,
   category: String,
   description: { type: String, required: false },
   created: { type: Date, default: Date.now },
   userId: String,
   num_comments: { type: Number, default: 0 }
});

module.exports = mongoose.model('Thread', ThreadSchema);
