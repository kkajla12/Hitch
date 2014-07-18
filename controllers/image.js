var Image = require('../models/image');

exports.postImages = function(req, res) {
   var image = new Image();

   image.filename = req.body.filename;
   image.url = req.body.url;
   image.threadId = req.body.threadId;
   image.userId = req.user._id;

   image.save(function(err) {
      if (err)
         res.send(err);

      res.json({ message: 'Image added!', data: image });
   });
};

exports.getImages = function(req, res) {
   Image.find(function(err, images) {
      if (err)
         res.send(err);

      res.json(images);
   });
};

exports.getImage = function(req, res) {
   Image.findById(req.params.image_id, function(err, image) {
      if (err)
         res.send(err);

      res.json(image);
   });
};

exports.putImage = function(req, res) {
   Image.update({ userId: req.user._id, _id: req.params.image_id }, { filename: req.body.filename, url: req.body.url }, function(err, num, raw) {
      if (err)
         res.send(err);

      res.json({ message: num + 'updated' });
   });
};

exports.deleteImage = function(req, res) {
   Image.remove({ userId: req.user._id, _id: req.params.image_id }, function(err) {
      if (err)
         res.send(err);

      res.json({ message: 'Image removed!' });
   });
};
