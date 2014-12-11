//index.js file that sets up server

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); //cookie parsing with signatures
var session = require('express-session');
var path = require('path');
var auth = require('./auth');

var authRouter = require('./routers/auth');
var apiRouter = require('./routers/api');
var mediaRouter = require('./routers/media');

// Middleware
var app = express();
app.use(cookieParser());
// Custom CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  next();
});
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '10mb'
}));
app.use(bodyParser.json({
  limit: '10mb'
}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(auth.initialize());
app.use(auth.session());



// Application
var port = process.env.PORT || 8000;
console.log('Server listening on ' + port);

app
  .use(express.static(path.resolve(__dirname + '/../client/')))
  .use(authRouter)
  .use('/media', auth.checkIfLoggedIn, mediaRouter)
  .use('/api', auth.checkIfLoggedIn, apiRouter)
  .use('*', function (req, res) {
    res.status(404).end();
  })
  .listen(port);