import { ADD_TASK, DELETE_TASK } from '../constants/ActionTypes'

import { List, Map, OrderedMap } from 'immutable';

const init = OrderedMap([]);

export default function taskReducer(state=init, action) {
    switch(action.type) {
        case ADD_TASK:
            return state.set(
                action.id,
                {timestamp: action.timestamp, task: action.task, obj: action.obj}
            );
        case DELETE_TASK:
            return state.filter(task => task.get('id') !== action.id)
        default:
            return state;
    }
}
