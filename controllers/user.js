var User = require('../models/user');
var Profile = require('../models/profile');

exports.postUsers = function(req, res) {
   var user = new User({
      username: req.body.username,
      password: req.body.password
   });

   user.save(function(err) {
      if (err)
	       res.send(err);

      res.json({ message: 'New user added!' });
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
  User.find({ username: req.param.user_name }, function(err, user) {
    if (err)
      res.send(err);

    res.json({ user: user });
  });
};
