import { connect } from 'react-redux';
import * as TaskActions from '../actions/TaskActions';
import Todo from '../components/Todo';
import { bindActionCreators } from 'redux';


const mapStateToProps = (state) => {
  return { tasks: state }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(TaskActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo)
