var Comment = require('../models/comment');
var Thread = require('../models/thread');
var Profile = require('../models/profile');

exports.postComments = function(req, res) {
   var comment = new Comment();

   comment.content = req.body.content;
   comment.likes = req.body.likes;
   comment.threadId = req.body.threadId;
   comment.userId = req.params.user_id;

      Thread.findById(req.body.threadId, function(err, thread) {
         if (err)
            res.send(err);

         thread.num_comments += 1;

         thread.save(function(err) {
            if (err)
               res.send(err);

            Profile.findOne({ userId: req.params.user_id }, function(err, profile) {
               if (err)
                  res.send(err);

               comment.username = profile.username;
               profile.num_comments += 1;

               profile.save(function(err) {
                  comment.save(function(err) {
                     if (err)
                        res.send(err);

                     res.json({ message: 'Comment added!', data: comment });
                  });
               });
            });
         });
      });
};

exports.getComments = function(req, res) {
   Comment.find(function(err, comments) {
      if (err)
         res.send(err);

      res.json(comments);
   });
};

exports.getComment = function(req, res) {
   Comment.findById(req.params.comment_id, function(err, comment) {
      if (err)
         res.send(err);

      res.json(comment);
   });
};

exports.likeComment = function(req, res) {
   Comment.findById(req.params.comment_id, function(err, comment) {
      if (err)
         res.send(err);

      comment.likes += 1;

      comment.save(function(err){
         if (err)
            res.send(err);

         res.json(comment);
      });
   });
};

exports.putComment = function(req, res) {
   Comment.findById(req.params.comment_id, function(err, comment) {
      if (err)
         res.send(err);

      comment.content = req.body.content;

      comment.save(function(err){
         if (err)
            res.send(err);

         res.json(comment);
      });
   });
};

exports.deleteComment = function(req, res) {
   Comment.remove({ userId: req.user._id, _id: req.params.comment_id }, function(err) {
      if (err)
         res.send(err);

      res.json({ message: 'Comment removed!' });
   });
};

exports.getCommentByDate = function(req, res) {
   Comment.find({ created: req.params.date }, function(err, comments) {
      if (err)
         res.send(err);

      res.json(comments);
   });
};

exports.getCommentByThread = function(req, res) {
   Comment.find({ threadId: req.params.thread_id }, function(err, comments) {
      if (err)
         res.send(err);

      res.json(comments);
   });
};

exports.getCommentByUser = function(req, res) {
   Comment.find({ userId: req.params.user_id }, function(err, comments) {
      if (err)
         res.send(err);

      res.json(comments);
   });
};
