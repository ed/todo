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
    createTask: function(hash, task){
        var task = {
            id: uuid.v4(),
            name: task.name,
            dateDue: task.dateDue,
            assigned: task.assigned,
            dateCreated: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            drawing: task.drawing,
            subTasks: task.subTasks,
            prio: task.prio,
            tags: task.tags
        }
        console.log(task)
        // client.HMSET(hash, task);
    }
}
