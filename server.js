var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var ejs = require('ejs');
var session = require('express-session');

var authController = require('./controllers/auth');
var oauth2Controller = require('./controllers/oauth2');
var imageController = require('./controllers/image');
var threadController = require('./controllers/thread');
var commentController = require('./controllers/comment');
var userController = require('./controllers/user');
var profileController = require('./controllers/profile');
var clientController = require('./controllers/client');

mongoose.connect('mongodb://localhost:27017/hitchdatabase');

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(passport.initialize());

app.use(session({
   secret: 'Super Secret Session Key',
   saveUninitialized: true,
   resave: true
}));

var port = process.env.PORT || 3000;
var router = express.Router();
var uploadManager = require('./controllers/uploadManager')(router);

router.get('/', function(req, res) {
   res.json({ message: 'Welcome to the Hitch API! Navigate to /api to request data.' });
});

// OAuth2 Routes
router.route('/api/oauth2/authorize')
   .get(authController.isAuthenticated, oauth2Controller.authorization)
   .post(authController.isAuthenticated, oauth2Controller.decision);

router.route('/api/oauth2/token')
   .post(authController.isClientAuthenticated, oauth2Controller.token);

// Client Routes
router.route('/api/clients')
   .post(authController.isAuthenticated, clientController.postClients)
   .get(authController.isAuthenticated, clientController.getClients);

// Profile Routes
router.route('/api/profiles')
   .get(profileController.getProfiles);

router.route('/api/profiles/:profile_id')
   .get(profileController.getProfile)
   .put(authController.isAuthenticated, profileController.putProfile)
   .delete(authController.isAuthenticated, profileController.deleteProfile);

router.route('/api/profiles/user/:user_id')
   .get(profileController.getProfileByUser)
   .post(profileController.postProfiles)
   .put(authController.isAuthenticated, profileController.putProfileByUser)
   .delete(authController.isAuthenticated, profileController.deleteProfileByUser);

// User Routes
router.route('/api/users')
   .post(userController.postUsers)
   .get(authController.isAuthenticated, userController.getUsers);

router.route('/api/users/:user_id')
   .get(authController.isAuthenticated, userController.getUserById);

router.route('/api/users/username/:user_name')
   .get(authController.isAuthenticated, userController.getUserByName);

// Image Routes
router.route('/api/images')
   .get(imageController.getImages);

router.route('/api/images/:image_id')
   .get(imageController.getImage)
   .put(authController.isAuthenticated, imageController.putImage)
   .delete(authController.isAuthenticated, imageController.deleteImage);

router.route('/api/images/date/:date')
   .get(imageController.getImageByDate);

router.route('/api/images/thread/:thread_id')
   .get(imageController.getImageByThread);

router.route('/api/images/user/:user_id')
   .get(imageController.getImageByUser)
   .post(authController.isAuthenticated, imageController.postImages);

router.route('/download/:image_id')
   .get(imageController.downloadImage);

// Thread Routes
router.route('/api/threads')
   .get(threadController.getThreads);

router.route('/api/threads/:thread_id')
   .get(threadController.getThread)
   .put(authController.isAuthenticated, threadController.putThread)
   .delete(authController.isAuthenticated, threadController.deleteThread);

router.route('/api/threads/category/:category')
   .get(threadController.getThreadByCategory);

router.route('/api/threads/user/:user_id')
   .get(threadController.getThreadByUser)
   .post(authController.isAuthenticated, threadController.postThreads);

router.route('/api/threads/date/:date')
   .get(threadController.getThreadByDate);

router.route('/api/threads/sort/top')
   .get(threadController.getTopThreads);

// Comment Routes
router.route('/api/comments')
   .get(commentController.getComments);

router.route('/api/comments/:comment_id')
   .get(commentController.getComment)
   .put(authController.isAuthenticated, commentController.putComment)
   .delete(authController.isAuthenticated, commentController.deleteComment);

router.route('/api/comments/like/:comment_id')
   .put(authController.isAuthenticated, commentController.likeComment);

router.route('/api/comments/date/:date')
   .get(commentController.getCommentByDate);

router.route('/api/comments/thread/:thread_id')
   .get(commentController.getCommentByThread);

router.route('/api/comments/user/:user_id')
   .get(commentController.getCommentByUser)
   .post(authController.isAuthenticated, commentController.postComments);

app.use('/', router);
//app.use('/api', router);

app.listen(port);
console.log('Server listening on port: 3000');
