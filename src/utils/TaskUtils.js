import uuid from 'node-uuid';
var moment = require('moment');
moment().format();
// redis = require('redis');
// var client = redis.createClient();

module.export = {
    getTasks: function(hash) {
        tasks = [];
        // client.hgetall(hash, function(err, objs) {
        //     if (!err) {
        //         for (var i in objs) {
        //             tasks.push(objs[i]);
        //         }
        //     }
        },
    createTask: function(hash, text, dateDue, drawing, assigned, subTasks, tags ){
        var task = {
            id: uuid.v4(),
            text: text,
            dateDue: dateDue,
            assigned: assigned,
            dateCreated: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            drawing: drawing,
            subTasks: subTasks,
            tags: tags
        }
        console.log(task)
        // client.HMSET(hash, task);
    }
}
