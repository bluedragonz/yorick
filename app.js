var express = require('express');
var app = express.createServer();
var socket = require('socket.io');
app.configure(function(){
  app.use(express.static(__dirname + '/'));
});

var port = 3333;

var pub = __dirname + '/public';
app.use(app.router);
app.use(express.static(pub));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout: false});

app.configure(function(){
  app.use(express.static(__dirname + '/'));
});

app.use(express.cookieParser());
app.use(express.session({secret: 'secret', key: 'express.sid'}));

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
  res.render('index', {
    title: 'title'
  });
});

var server = app.listen(port);
var io = socket.listen(server);

var active_connections = 0;
io.sockets.on('connection', function (socket) {

  active_connections++

  io.sockets.emit('user:connect', active_connections);

  socket.on('disconnect', function () {
    active_connections--
    io.sockets.emit('user:disconnect', active_connections);
  });

});
