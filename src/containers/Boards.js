import { connect } from 'react-redux'
import Board from '../components/Board'
import makeGetVisibleTodos from '../selectors/TodoSelector'

const makeMapStateToProps = () => {
  const getVisibleTodos = makeGetVisibleTodos()
  const mapStateToProps = (state, props) => {
    return {
      cards: getVisibleTodos(state, props)
    }
  }
  return mapStateToProps
}


const Boards = connect(
  makeMapStateToProps,
)(Board)

export default Boards 
