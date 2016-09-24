import { connect } from 'react-redux'
import Board from '../components/Board'
import * as actions from '../actions/actions';
import timeSort from '../selectors/TodoSelector'
import { bindActionCreators } from 'redux';

const makeMapStateToProps = () => {
  const ATN = timeSort()
  const mapStateToProps = (state, props) => {
    const { tasks } = state;
    return {
      tasks: ATN(tasks, props),
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
};


export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Board)
