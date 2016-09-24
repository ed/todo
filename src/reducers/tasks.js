import { DELETE_TASKS_OF_CARD, ADD_TASK, DELETE_TASK, EDIT_TODO} from '../constants/ActionTypes'
import { Map } from 'immutable';


export default function tasks(state, action) {
  state = state ? state : Map();
  switch(action.type) {
    case ADD_TASK:
      return state.set(action.id, {
        id: action.id, 
        timestamp: action.timestamp, 
        name: action.obj.name,
        time: action.obj.time,
        date: action.obj.date,
        card: action.obj.card,
        tags: action.tags,
        prio: action.prio,
        content: '',
        done: 0})
    case DELETE_TASK:
      return state.filter(task => task.id !== action.id ); 
    case DELETE_TASKS_OF_CARD:
      return state.filter(task => task.card !== action.id);
    case EDIT_TODO:
      state = state.update(action.id, t => Object.assign({},t, action.obj))
      return state;
    default:
      return state;
  }
}
