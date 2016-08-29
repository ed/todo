import uuid from 'node-uuid';
var moment = require('moment');
moment().format();
// redis = require('redis');
// var client = redis.createClient();

module.export = {
    getMeetings: function(hash) {
        meetings = [];
        // client.hgetall(hash, function(err, objs) {
        //     if (!err) {
        //         for (var i in objs) {
        //             meetings.push(objs[i]);
        //         }
        //     }
        },
    createMeeting: function(hash, meeting){
        var meeting = {
            id: uuid.v4(),
            with: meeting.with,
            type: meeting.type,
            start: meeting.start,
            end: meeting.end,
            tags: meeting.tags,
            dateCreated: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        }
        console.log(meeting)
        // client.HMSET(hash, meeting);
    }
}
