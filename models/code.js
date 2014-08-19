var mongoose = require('mongoose');

var CodeSchema = new mongoose.Schema({
   value: { type: String, required: true },
   redirectUri: { type: String, required: true },
   userId: { type: String, required: true },
   clientId: { type: String, required: true }
});

/*CodeSchema.pre('save', function(callback) {
   var code = this;

   if (!code.isModified('value')) return callback();

   bcrypt.genSalt(5, function(err, salt) {
      if (err) return callback(err);

      bcrypt.hash(code.value, salt, null, function(err, hash) {
   if (err) return callback(err);
   code.value = hash;
   callback();
      });
   });
});*/

module.exports = mongoose.model('Code', CodeSchema);
