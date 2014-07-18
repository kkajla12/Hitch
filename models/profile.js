var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
   num_comments: { type: Number, default: 0 },
   likes: { type: Number, default: 0 },
   userId: String,
   relationship_rating: { type: Number, default: 0 },
   hookup_rating: { type: Number, default: 0 },
   firstdate_rating: { type: Number, default: 0 },
   breakup_rating: { type: Number, default: 0 },
   latenight_rating: { type: Number, default: 0 }
});

module.exports = mongoose.model('Profile', ProfileSchema);
