import { ADD_TASK, DELETE_TASK, EDIT_TODO } from '../constants/ActionTypes'
import { List, Map, OrderedMap} from 'immutable';

export default function taskReducer(state=List(), action) {
    switch(action.type) {
        case ADD_TASK:
            return state.push(
                Map({id: action.id, 
                    timestamp: action.timestamp, 
                    task: action.task, 
                    name: action.name,
                    done: false})
            );
        case DELETE_TASK:
            return state.filter( task => task.get('id') !== action.id ); 
        case EDIT_TODO:
            let temp = state.findIndex(map => map.get('id') === action.id);
            for (var keys in action.obj) {
                state = state.update(temp, map => map.set(keys, action.obj[keys]))
            }
            return state;
        default:
            return state;
    }
}
