import { combineReducers } from 'redux'
import tasks from './tasks'
import cards from './cards'

export default combineReducers({
  cards,
  tasks
})
