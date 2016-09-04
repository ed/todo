import * as types from '../constants/ActionTypes'
let uuid = require('node-uuid');
let moment = require('moment');


export const addTask = (name, task) => {
    return {
        type: types.ADD_TASK,
        id: uuid.v4(),
        timestamp: moment(Date.now()).format("h:mm a"),
        task: task,
        name: name
    }
}

export const deleteTask = (id) => {
    return {
        type: types.DELETE_TASK,
        id
    }
}

export const editTodo = (current, obj) => {
    return {
        type: types.EDIT_TODO,
        id: current,
        obj
    }
}

export const createList = (name) => {
    return {
        type: types.CREATE_LIST,
        timestamp: moment(Date.now()).format("h:mm a"),
        name
    }
}

export const beforeMove = (id, name) => {
    return {
        type: types.MOVE_TO,
        name: name,
        id: id
    }
}

export const moveTo = (id, sublist) => {
    return dispatch => {
        dispatch(beforeMove(id, sublist));
        dispatch(deleteTask(id));
    }
}
