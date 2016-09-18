import { createSelector } from 'reselect'
import { isInWeek, tttf, compare } from '../utils/TimeUtils'


const date = (state, props) => props.date;
const status = (state, props) => props.id;
const val = (state, props) => props.val.val;
const fil = (state, props) => props.val.filter;


const filter = createSelector(
  state => state,
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

const timeSort = createSelector(
  dateSort,
  (date) => date.sort((a,b) => tttf(a.time).localeCompare(tttf(b.time)))
);

const allTogetherNow = () => { 
  return createSelector(
    timeSort,
    status,
    (sorted, done) => {
      switch (done) {
        case 0:
          return sorted.filter(todo => todo.done === 0)
        case 1:
          return sorted.filter(todo => todo.done === 1)
        case 2:
          return sorted.filter(todo => todo.done === 2)
        default:
          return sorted
      }
    })};

export default allTogetherNow
