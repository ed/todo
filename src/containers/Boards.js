import { connect } from 'react-redux'
import Board from '../components/Board'
import allTogetherNow from '../selectors/TodoSelector'

const makeMapStateToProps = () => {
  const ATN = allTogetherNow()
  const mapStateToProps = (state, props) => {
    return {
      cards: ATN(state, props)
    }
  }
  return mapStateToProps
}


const Boards = connect(
  makeMapStateToProps,
)(Board)

export default Boards 
