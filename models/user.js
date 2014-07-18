var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
   username: {
      type: String,
      unique: true,
      required: true
   },
   password: {
      type: String,
      required: true
   }
   /*threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }],
   comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
   num_comments: { type: Number, default: 0 },
   likes: { type: Number, default: 0 },
   relationship_rating: { type: Number, default: 0 },
   hookup_rating: { type: Number, default: 0 },
   firstdate_rating: { type: Number, default: 0 },
   breakup_rating: { type: Number, default: 0 },
   latenight_rating: { type: Number, default: 0 }*/
});

UserSchema.pre('save', function(callback) {
   var user = this;

   if (!user.isModified('password')) return callback();

   bcrypt.genSalt(5, function(err, salt) {
      if (err) return callback(err);

      bcrypt.hash(user.password, salt, null, function(err, hash) {
	 if (err) return callback(err);
	 user.password = hash;
	 callback();
      });
   });
});

UserSchema.methods.verifyPassword = function(password, cb) {
   bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
   });
};

module.exports = mongoose.model('User', UserSchema);
