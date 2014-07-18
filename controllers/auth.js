var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../models/user');
var Client = require('../models/client'); 
var Token = require('../models/token');

passport.use(new BearerStrategy(
   function(accessToken, callback) {
      Token.findOne({ value: accessToken }, function (err, token) {
	 if (err) { return callback(err); }

	 // No token was found
	 if (!token) { return callback(null, false); }

	 User.findOne({ _id: token.user._id }, function (err, user) {
	    if (err) { return callback(err); }

	    // No user was found
	    if (!user) { return callback(null, false); }
	    
	    // no scope example
	    callback(null, user, { scope: '*' });
	 });
      });
   }
));

passport.use(new BasicStrategy(
   function(username, password, callback) {
      User.findOne({ username: username }, function(err, user) {
	 if (err) { return callback(err); }

	 // No user found with this username
	 if (!user) { return callback(null, false); }

	 // Check that the password is correct
	 user.verifyPassword(password, function(err, isMatch) {
	    if (err) { return callback(err); }

	    // Password did not match
	    if(!isMatch) { return callback(null, false); }

	    // Succeeded
	    return callback(null, user);
	 });
      });
   }
));

passport.use('client-basic', new BasicStrategy(
   function(username, password, callback) {
      Client.findOne({ id: username }, function (err, client) {
	 if (err) { return callback(err); }

	 // No client was found with given id or password was incorrect
	 if (!client || client.secret !== password) { return callback(null, false); }

	 // Succeeded
	 return callback(null, client);
      });  
   }
));

exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session: false });
exports.isAuthenticated = passport.authenticate([ 'basic', 'bearer' ], { session: false });
