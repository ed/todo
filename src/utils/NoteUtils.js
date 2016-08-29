import uuid from 'node-uuid';
var moment = require('moment');
moment().format();
let socket = io.connect();
// redis = require('redis');
// var client = redis.createClient();

module.exports = {
    createNote: function(note){
        var note = {
            id: uuid.v4(),
            name: note.name,
            content: note.content,
            tags: note.tags,
            dateCreated: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        }
        console.log(note)
        socket.emit('new note', note);
    }
}
