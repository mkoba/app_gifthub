
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var createevent = require('./routes/createevent');
var eventcode = require('./routes/eventcode');
var eventcreated = require('./routes/eventcreated');
var eventpage = require('./routes/eventpage');
var home = require('./routes/home');
var idea = require('./routes/idea');
var ideaundo = require('./routes/ideaundo');
var submitidea = require('./routes/submitidea');
var ideabought = require('./routes/ideabought');

// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/createevent', createevent.view);
app.get('/eventcode', eventcode.view);
app.get('/eventcreated', eventcreated.view);
app.get('/eventpage', eventpage.view);
app.get('/home', home.view);
app.get('/idea', idea.view);
app.get('/ideaundo', ideaundo.view);
app.get('/submitidea', submitidea.view);
app.get('/ideabought', ideabought.view);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
