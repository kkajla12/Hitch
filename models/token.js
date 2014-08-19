var mongoose = require('mongoose');

var TokenSchema = new mongoose.Schema({
   value: { type: String, required: true },
   userId: { type: String, required: true },
   clientId: { type: String, required: true }
});

/*TokenSchema.pre('save', function(callback) {
   var token = this;

   if (!token.isModified('value')) return callback();

   bcrypt.genSalt(5, function(err, salt) {
      if (err) return callback(err);

      bcrypt.hash(token.value, salt, null, function(err, hash) {
   if (err) return callback(err);
   token.value = hash;
   callback();
      });
   });
});*/

module.exports = mongoose.model('Token', TokenSchema);
