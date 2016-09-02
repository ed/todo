import { ADD_TASK, DELETE_TASK } from '../constants/ActionTypes'
import { List, Map, OrderedMap} from 'immutable';

const init = List([]);

export default function taskReducer(state=init, action) {
    switch(action.type) {
        case ADD_TASK:
            return state.push(
                {id: action.id, timestamp: action.timestamp, task: action.task, obj: action.obj}
            );
        case DELETE_TASK:
            return state.filter( task => task.id !== action.id ); 
        default:
            return state;
    }
}
