
/**
 * Module dependencies.
 */

var express = require('express');

var routes = require('./routes');
var newuser = require('./routes/newuser');
var http = require('http');
var path = require('path');

var app = express();

//Mongo DB Connections

 var mongo = require('mongodb');
 
 
   var Db = mongo.Db;
  var monk = require('monk');
  var db = monk('--YOUR mongodb connection String--');

 // var db = monk('http://localhost:27017/expresshogan/');
  //app.db=db;
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.options('/*', function( query, reply ) {
reply.writeHead( '204', {
'Access-Control-Allow-Origin': '*', // allow x-domain requests
'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS', // enable all http methods
'Access-Control-Allow-Credentials': false,
'Access-Control-Max-Age': '86400', // allow caching of this response
'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
} );
reply.end();
} );

app.all('/*',function(req,res,next) {
  
  res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   res.header('Content-Type', 'application/json');
	next();
});

app.get('/', routes.index(db));

app.get('/new/:id',newuser.findById(db));
app.post('/new', newuser.user(db));
app.put('/new',newuser.update(db));
app.delete('/new', newuser.deleteId(db));
//app.get('/userList',routes.userList(db));

//app.listen(port);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});