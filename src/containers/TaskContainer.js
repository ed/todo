import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as TaskActions from '../actions/TaskActions';
import Todo from '../components/Todo';
import Calendar from '../components/Calendar';
import { bindActionCreators } from 'redux';
import { createEdits } from '../utils/GeneralUtils'
import { createTimeInterval, agenda } from '../utils/TimeUtils'


class TaskContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { tasks, actions } = this.props;
		const editList = createEdits();
		const currentWeek = agenda();
		const timeList = createTimeInterval();
		return (
			<Todo actions={actions} tasks={tasks} editList={editList} currentWeek={currentWeek} timeList={timeList}/>
		)
	}
}


function mapStateToProps(state) {
	return { tasks: state };
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(TaskActions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TaskContainer)
