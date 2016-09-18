import { ADD_TASK, DELETE_TASK, EDIT_TODO} from '../constants/ActionTypes'
import { Map } from 'immutable';

export default function taskReducer(state=Map(), action) {
  switch(action.type) {
    case ADD_TASK:
      return state.set(action.idx, {id: action.id, 
        timestamp: action.timestamp, 
        idx: action.idx,
        name: action.obj.input,
        time: action.obj.time,
        date: action.obj.date,
        tags: action.tags,
        prio: action.prio,
        done: 0})
    case DELETE_TASK:
      return state.filter(task => task.id !== action.id ); 
    case EDIT_TODO:
      state = state.update(action.id, t => Object.assign({},t, action.obj))
      return state;

    default:
      return state;
  }
}
