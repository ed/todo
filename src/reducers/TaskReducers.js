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
        case CREATE_LIST:
            return state.push(OrderedMap({[action.name]: List()}))
        case DELETE_SECTION_ITEM:
            let secItem = state.findIndex(map => map.get(action.name));
            secItem = state.get(temp2).get(action.name);
            secItem = secItem.filter( map => map.get('id') !== action.id ); 
            return state;
        case MOVE_TO:
            let temp2 = state.findIndex(map => map.get(action.name));
            temp2 = state.get(temp2).get(action.name);
            let temp3 = state.findIndex(map => map.get('id') === action.id);
            temp2 = temp2.push(state.get(temp3));
            return state;

        default:
            return state;
    }
}
