import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as TaskActions from '../actions/TaskActions';
import TodoComposer from '../components/TodoComposer';
import TodoSection from '../components/TodoSection';
import { bindActionCreators } from 'redux';

class App extends Component {
    constructor(props) {
        super(props);
        this._toggleState = this._toggleState.bind(this);
        this.state = {
            todo: false
        }
    }
    _toggleState(e) {
        e.preventDefault();
        this.setState({todo: !this.state.todo});
    }
    render() {
        const { tasks, actions } = this.props;
        console.log(this.state.todo)
        return (
            <div className="parent">
            <div className="column">
            <input type="button" 
            className="add-todo"
            value="add todo" 
            onClick={this._toggleState}
            />
            {this.state.todo ? <TodoComposer addTask={actions.addTask}/> : null}
            </div>
            <div className="column">
            {this.state.todo ? <TodoSection tasks={tasks} actions={actions}/> : null}
            </div>
            <div className="column">
            <h5>hi there</h5>
            </div>

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
