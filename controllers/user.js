var User = require('../models/user');
var Profile = require('../models/profile');

exports.postUsers = function(req, res) {
   var user = new User({
      username: req.body.username,
      password: req.body.password,
	    email: req.body.email
   });

   user.save(function(err) {
      if (err)
	       res.send(err);

      var profile = new Profile({
        username: req.body.username,
        userId: user._id,
        bio: req.body.bio
      });

      profile.save(function(err) {
         if (err)
            res.send(err);

         res.json({ message: 'New user added!', userId: user._id });
      });
   });
};

exports.getUsers = function(req, res) {
   User.find(function(err, users) {
      if (err)
	 res.send(err);

      res.json(users);
   });
};

exports.getUserById = function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if (err)
      res.send(err);

    var profile = Profile.find({ userId: req.params.user_id }, function(err, profile) {
      if (err)
        res.send(err);

      res.json({ user: user, profile: profile });
    });
  });
};

exports.getUserByName = function(req, res) {
  User.find({ username: req.params.user_name }, function(err, user) {
    if (err)
      res.send(err);

    res.json({ user: user });
  });
};
