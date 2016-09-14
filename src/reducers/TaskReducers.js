import { ADD_TASK, DELETE_TASK, EDIT_TODO, CREATE_LIST, MOVE_TO, DELETE_SECTION_ITEM } from '../constants/ActionTypes'
import { List, Map, OrderedMap} from 'immutable';

export default function taskReducer(state=List(), action) {
    switch(action.type) {
        case ADD_TASK:
            return state.push(
                Map({id: action.id, 
                    timestamp: action.timestamp, 
                    task: action.task, 
                    name: action.name,
                    location: action.location,
					time: action.time,
					dueDate: action.dueDate,
					tags: action.tags,
					prio: action.prio,
					users: action.users,
					sub: action.sub,
                    done: 0})
            );
        case DELETE_TASK:
            return state.filter( task => task.get('id') !== action.id ); 
        case EDIT_TODO:
            let temp = state.findIndex(map => map.get('id') === action.id);
            for (var keys in action.obj) {
                state = state.update(temp, map => map.set(keys, action.obj[keys]))
            }
            return state;
        case MOVE_TO:
            let temp2 = state.findIndex(map => map.get(action.id));
            return state.update(temp2, map => map.set('location', action.section))
        default:
            return state;
    }
}
