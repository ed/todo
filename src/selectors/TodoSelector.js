import { createSelector } from 'reselect'
import { isInWeek, tttf, compare } from '../utils/TimeUtils'


const date = (state, props) => props.date;
const status = (state, props) => props.card;
const val = (state, props) => props.val.val;
const fil = (state, props) => props.val.filter;

const kanban = createSelector(
  state => state,
  status,
  (sorted,card) => { 
    return sorted.filter(todo => todo.card === card)
  }
);


const filter = createSelector(
  kanban,
  val,
  fil,
  (s,v,f) => s.filter(todo => f ? todo[f] === v : todo)
)

const dateFilter = createSelector(
  filter,
  date,
  (todos, day) => {
    switch (day) {
      case '':
        return todos.filter(todo => todo.date === day || !isInWeek(todo.date))
      default:
        return todos.filter(todo => todo.date === day)
    }
  }
)

const dateSort = createSelector(
  dateFilter,
  (date) => date.sortBy(todo => todo.date)
)

const timeSort = () => { 
  return createSelector(
    dateSort,
    (date) => date.sort((a,b) => tttf(a.time).localeCompare(tttf(b.time))) 
  )};

export default timeSort
