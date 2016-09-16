import { ADD_TASK, DELETE_TASK, EDIT_TODO, SET_DONE } from '../constants/ActionTypes'
import { List, Map, OrderedMap} from 'immutable';

export default function taskReducer(state=Map(), action) {
  switch(action.type) {
    case ADD_TASK:
      return state.set(action.idx, {id: action.id, 
        timestamp: action.timestamp, 
        idx: action.idx,
        name: action.obj.input,
        time: action.obj.time,
        dueDate: action.obj.dueDate,
        tags: action.tags,
        prio: action.prio,
        done: 0})
    case DELETE_TASK:
      return state.filter(task => task.id !== action.id ); 
    case EDIT_TODO:
      const KEYS = Object.keys(action.obj)
      return state.update(action.id, t => {
        return KEYS.reduce((map, key) => {
          return map.set(key, state.get(key))}),t})
    case SET_DONE:
      state = state.update(action.id, t => Object.assign({},t,{ done : action.done}))
      return state;

    default:
      return state;
  }
}
