import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as TaskActions from '../actions/TaskActions';
import TodoComposer from '../components/TodoComposer';
import TodoSection from '../components/TodoSection';
import TodoEdit from '../components/TodoEdit';
import { bindActionCreators } from 'redux';

class App extends Component {
    constructor(props) {
        super(props);
        this._toggleState = this._toggleState.bind(this);
        this._handleClick = this._handleClick.bind(this);
        this.state = {
            newTodo: false,
            editView: false,
            current: ''
        }
    }


    _handleClick(e) {
        e.preventDefault();
        this.setState({newTodo: false, editView: true, current: this.props.tasks.get(e.target.id).id
        });
    }

    _toggleState(e) {
        e.preventDefault();
        this.setState({newTodo: !this.state.newTodo});
    }
    render() {
        const { tasks, actions } = this.props;
        return (
            <div className="parent">
            <div className="column">
            <input type="button" 
            className="add-todo"
            value="add todo" 
            onClick={this._toggleState}
            />
            {this.state.newTodo ? <TodoComposer addTask={actions.addTask}/> : null}
            </div>
            <div className="column">
            <TodoSection tasks={tasks} actions={actions} handleClick={this._handleClick}/>
            </div>
            <div className="column">
            {this.state.editView ? <TodoEdit actions={actions} current={this.state.current}/> : null}
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
