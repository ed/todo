import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as TaskActions from '../actions/TaskActions';
import TodoComposer from '../components/TodoComposer';
import TodoSection from '../components/TodoSection';
import { bindActionCreators } from 'redux';

class App extends Component {
    render() {
        const { tasks, actions } = this.props;
        return (
            <div>
            <TodoComposer addTask={actions.addTask}/>
            <TodoSection tasks={tasks} actions={actions}/>
            </div>
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
)(App)
