var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var ProfileSchema = new mongoose.Schema({
   username: { type: String, unique: true, required: true },
   num_comments: { type: Number, default: 0 },
   likes: { type: Number, default: 0 },
   userId: String,
   relationship_rating: { type: Number, default: 0 },
   hookup_rating: { type: Number, default: 0 },
   firstdate_rating: { type: Number, default: 0 },
   breakup_rating: { type: Number, default: 0 },
   latenight_rating: { type: Number, default: 0 }
});
ProfileSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Profile', ProfileSchema);
