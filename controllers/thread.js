var Thread = require('../models/thread');
var Image = require('../models/image');
var Comment = require('../models/comment');
var Profile = require('../models/profile');

exports.postThreads = function(req, res) {
   var thread = new Thread();

   thread.title = req.body.title;
   thread.category = req.body.category;
   thread.description = req.body.description;
   thread.userId = req.params.user_id;

      Profile.findOne({ userId: req.params.user_id }, function(err, profile) {
         if (err)
            res.send(err);

         thread.username = profile.username;
         profile.num_threads += 1;

         profile.save(function(err) {
            thread.save(function(err) {
               if (err)
                  res.send(err);

               res.json({ message: 'Thread created!', data: thread });
            });
         });
      });
};

exports.getThreads = function(req, res) {
   Thread.find(function(err, threads) {
      if (err)
         res.send(err);

      res.json(threads);
   });
};

exports.getThread = function(req, res) {
   Thread.findById(req.params.thread_id, function(err, thread) {

      var comments = Comment.find({ threadId: req.params.thread_id }, function(err, comments) {

        var images = Image.find({ threadId: req.params.thread_id }, function(err, images) {
  	       if (err)
  	          res.send(err);

           res.json([{ thread: thread, comments: comments, images: images}]);
  	    });
      });
  });
};

exports.putThread = function(req, res) {
   Thread.findById(req.params.thread_id, function(err, thread) {
      if (err)
         res.send(err);

      thread.title = req.body.title;
      thread.category = req.body.category;
      thread.description = req.body.description;

      thread.save(function(err){
         if(err)
            res.send(err);
         res.json(thread);
      });
   });
};

exports.deleteThread = function(req, res) {
   Thread.remove({ userId: req.user._id, _id: req.params.thread_id }, function(err) {
      if (err)
         res.send(err);

      res.json({ message: 'Thread removed!' });
   });
};

exports.getThreadByCategory = function(req, res) {
  Thread.find({ category: req.params.category }, function(err, threads) {
    if (err)
      res.send(err);

    res.json({ threads: threads });
  });
};

exports.getThreadByUser = function(req, res) {
  Thread.find({ userId: req.params.user_id }, function(err, threads) {
    if (err)
      res.send(err);

    res.json({ threads: threads });
  });
};

exports.getThreadByDate = function(req, res) {
  Thread.find({ created: req.params.date }, function(err, threads) {
    if (err)
      res.send(err);

    res.json({ threads: threads });
  });
};

exports.getTopThreads = function(req, res) {
  Thread.find().limit(20).sort('-num_comments').exec(function(err, threads) {
     if (err)
        res.send(err);

     res.json({ threads: threads });
  });
};

exports.searchThreads = function(req, res) {
  Thread.find({ title: new RegExp(req.params.search_string, "i") }, function(err, threads) {
     if(err)
        res.send(err)
     res.json({ threads: threads });
  });
};
