import { ADD_CARD, DELETE_CARD, EDIT_CARD} from '../constants/ActionTypes'
import { OrderedMap } from 'immutable';

export default function cards(state, action) {
  state = state ? state : OrderedMap();
  switch(action.type) {
    case ADD_CARD:
      return state.set(action.id, {
        id: action.id, 
        timestamp: action.timestamp, 
        name: action.name, 
      })
    case DELETE_CARD:
      return state.filter(card => card.id !== action.id ); 
    case EDIT_CARD:
      state = state.update(action.id, c => Object.assign({},c, action.obj))
      return state;
    default:
      return state;
  }
}

