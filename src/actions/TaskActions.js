import * as types from '../constants/ActionTypes'
let uuid = require('node-uuid');
let moment = require('moment');


export const addTask = (obj, task) => {
    return {
        type: types.ADD_TASK,
        id: uuid.v4(),
        timestamp: moment(Date.now()).format("h:mm a"),
        task: task,
        obj
    }
}

export const deleteTask = (id) => {
    return {
        type: types.DELETE_TASK,
        id
    }
}
