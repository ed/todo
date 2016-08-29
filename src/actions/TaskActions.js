let uuid = require('node-uuid');
let moment = require('moment');


export const addTask = (obj, task) => {
    return {
        type: 'ADD_TASK',
        id: uuid.v4(),
        timestamp: moment(Date.now()).format("h:mm a"),
        task: task,
        obj
    }
}

export const deleteTask = (id) => {
    return {
        type: 'DELETE_TASK',
        id
    }
}
