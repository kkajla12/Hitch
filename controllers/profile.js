var Profile = require('../models/profile');

exports.postProfiles = function(req, res) {
   var profile = new Profile();

   profile.username = req.body.username;
   profile.num_comments = req.body.num_comments;
   profile.likes = req.body.likes;
   profile.userId = req.params.user_id;
   profile.relationship_rating = req.body.relationship_rating;
   profile.hookup_rating = req.body.hookup_rating;
   profile.firstdate_rating = req.body.firstdate_rating;
   profile.breakup_rating = req.body.breakup_rating;
   profile.latenight_rating = req.body.latenight_rating;

   profile.save(function(err) {
      if (err)
	 res.send(err);

      res.json({ message: 'Profile added!', data: profile });
   });
};

exports.getProfiles = function(req, res) {
   Profile.find(function(err, profiles) {
      if (err)
	 res.send(err);

      res.json(profiles);
   });
};

exports.getProfile = function(req, res) {
   Profile.findById(req.params.profile_id, function(err, profile) {
      if (err)
	 res.send(err);

      res.json(profile);
   });
};

exports.putProfile = function(req, res) {
   Profile.update({ userId: req.user._id, _id: req.params.profile_id }, { num_comments: req.body.num_comments, likes: req.body.likes, relationship_rating: req.body.relationship_rating, hookup_rating: req.body.hookup_rating, firstdate_rating: req.body.firstdate_rating, breakup_rating: req.body.breakup_rating, latenight_rating: req.body.latenight_rating }, function(err, num, raw) {
      if (err)
	 res.send(err);

      res.json({ message: num + 'updated' });
   });
};

exports.deleteProfile = function(req, res) {
   Profile.remove({ userId: req.user._id, _id: req.params.profile_id }, function(err) {
      if (err)
	 res.send(err);

      res.json({ message: 'Profile removed!' });
   });
};

exports.getProfileByUser = function(req, res) {
  Profile.find({ userId: req.params.user_id }, function(err, profile) {
    if(err)
      res.send(err);

    res.json({ profile: profile });
  });
};

exports.putProfileByUser = function(req, res) {
   Profile.update({ userId: req.params.user_id }, { num_comments: req.body.num_comments, likes: req.body.likes, relationship_rating: req.body.relationship_rating, hookup_rating: req.body.hookup_rating, firstdate_rating: req.body.firstdate_rating, breakup_rating: req.body.breakup_rating, latenight_rating: req.body.latenight_rating }, function(err, num, raw) {
      if (err)
   res.send(err);

      res.json({ message: num + 'updated' });
   });
};

exports.deleteProfileByUser = function(req, res) {
   Profile.remove({ userId: req.params.user_id }, function(err) {
      if (err)
   res.send(err);

      res.json({ message: 'Profile removed!' });
   });
};
