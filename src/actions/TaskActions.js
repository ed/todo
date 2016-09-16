import * as types from '../constants/ActionTypes'
let uuid = require('node-uuid');
let moment = require('moment');

let idx = 0;
export const addTask = (obj, task) => {
  return {
    type: types.ADD_TASK,
    id: uuid.v4(),
    timestamp: moment(Date.now()).format("h:mm a"),
    task: task,
    prio: '',
    idx: idx++,
    tags: '',
    obj,
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

export const setDone = (id, done) => {
  return {
    type: types.SET_DONE,
    id: id,
    done: done
  }
}

