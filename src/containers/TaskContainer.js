import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Todo from '../components/Todo';
import { bindActionCreators } from 'redux';


const mapStateToProps = (state) => {
  const { tasks, cards } = state
  return { 
    tasks: tasks,
    cards: cards,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo)
