const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const fs = require('fs');

let index = fs.readFileSync(__dirname + '/index.html');

let http = require('http').createServer(function(req, res) {
    res.writeHeader(200);  
    res.end(index);
}).listen(3001);

var io = require('socket.io').listen(http);

io.on('connection', function(socket){ 
    socket.on('load', function(hash) {
        socket.join(hash)
        socket.emit('load');
    });
    socket.on('new task', function(obj) {
        socket.broadcast.emit('update add', obj);
    });
    socket.on('delete task', function(obj) {
        socket.broadcast.emit('update remove', obj);
    });
});

new WebpackDevServer(webpack(config), {
    hot: true,
    colors: true,
    inline: true,
    proxy: {'**': 'http://localhost:3001'},
    historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
    if (err) {
        return console.log(err);
    }
    console.log('Listening at http://localhost:3000/');
});
