var Thread = require('../models/thread');
var Image = require('../models/image');
var Comment = require('../models/comment');

exports.postThreads = function(req, res) {
   var thread = new Thread();

   thread.category = req.body.category;
   thread.description = req.body.description;
   thread.userId = req.user._id;

   thread.save(function(err) {
      if (err)
         res.send(err);

      res.json({ message: 'Thread created!', data: thread });
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
      
      var comments = Comment.find({ threadId: thread._id }, function(err, comments) {

         var images = Image.find({ threadId: thread._id }, function(err, images) {
	    if (err)
	       res.send(err);   

	    res.json([{ thread: thread, comments: comments, images: images}]);
	 });
      });
   });
};

exports.putThread = function(req, res) {
   Thread.update({ userId: req.user._id, _id: req.params.thread_idi }, { category: req.body.category, images: req.body.images, comments: req.body.comments, description: req.body.description }, function(err, num, raw) {
      if (err)
         res.send(err);

      res.json({ message: num + 'updated' });
   });
};

exports.deleteThread = function(req, res) {
   Thread.remove({ userId: req.user._id, _id: req.params.thread_id }, function(err) {
      if (err)
         res.send(err);

      res.json({ message: 'Thread removed!' });
   });
};
