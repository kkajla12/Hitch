var mongoose = require('mongoose');
var crypto = require('crypto-js');

var ClientSchema = new mongoose.Schema({
   name: { type: String, unique: true, required: true },
   id: { type: String, required: true },
   secret: { type: String, required: true },
   userId: { type: String, required: true }
});

ClientSchema.pre('save', function(callback) {
   var client = this;

   if (!client.isModified('secret')) return callback();

   bcrypt.genSalt(5, function(err, salt) {
      if (err) return callback(err);

      bcrypt.hash(client.secret, salt, null, function(err, hash) {
         if (err) return callback(err);
            client.secret = hash;
            callback();
      });
   });
});

module.exports = mongoose.model('Client', ClientSchema);
