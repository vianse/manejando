'use strict';
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require("redis");
var r = redis.createClient(18013, "redis-18013.c13.us-east-1-3.ec2.cloud.redislabs.com");
r.subscribe('confirma');
r.subscribe('conteo');
r.subscribe('nuevo');
r.subscribe('comentario');
r.subscribe('crea');
r.on('message', function(channel, messageStr) {
    var message = JSON.parse(messageStr);
    io.emit(channel, message);
});
app.get('/', function(req, res) {
    res.writeHead(200, {
        'content-type': 'text/plain'
    });
    res.end('hello word');
});
server.listen(8000, function() {
    console.log("servidor corriendo");
});