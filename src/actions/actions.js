import * as types from '../constants/ActionTypes'
let uuid = require('node-uuid'); let moment = require('moment');

export const addCard = (name) => {
  return {
    type: types.ADD_CARD,
    id: uuid.v4(),
    timestamp: moment(Date.now()).format("h:mm a"),
    name: name,
  }
}

export const deleteTasksOfCard = (id) => {
  return {
    type: types.DELETE_TASKS_OF_CARD,
    id
  }
}

export const deleteCard = (id) => {
  return {
    type: types.DELETE_CARD,
    id
  }
}

export const editCard = (current, obj) => {
  return {
    type: types.EDIT_CARD,
    id: current,
    obj
  }
}


export const addTask = (obj, task) => {
  return {
    type: types.ADD_TASK,
    id: uuid.v4(),
    timestamp: moment(Date.now()).format("h:mm a"),
    task: task,
    prio: 'low',
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

export const fullDeleteCard = (id) => {
  return dispatch => {
    dispatch(deleteCard(id));
    dispatch(deleteTasksOfCard(id));
  }
}


