import { createSelector } from 'reselect'

const getVisibilityFilter = (state, props) =>
  props.id

const getName = (state, props) =>
  state

const makeGetVisibleTodos = () => {
  return createSelector(
    [ getVisibilityFilter, getName],
    (visibilityFilter, todos) => {
      console.log(todos)
      switch (visibilityFilter) {
        case 0:
          todos.filter(todo => console.log(todo.done))
          return todos.filter(todo => todo.done === 0)
        case 1:
          todos.filter(todo => console.log(todo.done))
          return todos.filter(todo => todo.done === 1)
        case 2:
          todos.filter(todo => console.log(todo.done))
          return todos.filter(todo => todo.done === 2)
        default:
          return todos
      }
    }
  )
}

export default makeGetVisibleTodos
