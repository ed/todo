const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const fs = require('fs');
const path = require('path');

const index = fs.readFileSync(path.join(__dirname, '/index.html'));

const http = require('http').createServer((req, res) => {
  res.writeHeader(200);
  res.end(index);
}).listen(3001);

const io = require('socket.io').listen(http);

io.on('connection', socket => {
  socket.on('new task', obj => {
    socket.broadcast.emit('update add', obj);
  });
  socket.on('delete task', obj => {
    socket.broadcast.emit('update remove', obj);
  });
});

new WebpackDevServer(webpack(config), {
  hot: true,
  colors: true,
  inline: true,
  proxy: { '**': 'http://localhost:3001' },
  historyApiFallback: true
}).listen(3000, 'localhost', (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Listening at localhost:3000/');
});
