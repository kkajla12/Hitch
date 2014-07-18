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
app.use(bodyParser());
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
   .post(profileController.postProfiles)
   .get(profileController.getProfiles);

router.route('/api/profiles/:profile_id')
   .get(profileController.getProfile)
   .put(authController.isAuthenticated, profileController.putProfile)
   .delete(authController.isAuthenticated, profileController.deleteProfile);

// User Routes
router.route('/api/users')
   .post(userController.postUsers)
   .get(authController.isAuthenticated, userController.getUsers);

// Image Routes
router.route('/api/images')
   .post(authController.isAuthenticated, imageController.postImages)
   .get(imageController.getImages);

router.route('/api/images/:image_id')
   .get(imageController.getImage)
   .put(authController.isAuthenticated, imageController.putImage)
   .delete(authController.isAuthenticated, imageController.deleteImage);

// Thread Routes
router.route('/api/threads')
   .post(authController.isAuthenticated, threadController.postThreads)
   .get(threadController.getThreads);

router.route('/api/threads/:thread_id')
   .get(threadController.getThread)
   .put(authController.isAuthenticated, threadController.putThread)
   .delete(authController.isAuthenticated, threadController.deleteThread);

// Comment Routes
router.route('/api/comments')
   .post(authController.isAuthenticated, commentController.postComments)
   .get(commentController.getComments);

router.route('/api/comments/:comment_id')
   .get(commentController.getComment)
   .put(authController.isAuthenticated, commentController.putComment)
   .delete(authController.isAuthenticated, commentController.deleteComment);

app.use('/', router);
//app.use('/api', router);

app.listen(port);
console.log('Server listening on port: 3000');
