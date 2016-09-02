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
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            newTodo: false,
            editView: false,
            current: {
                id: '',
                name: ''
            }
        }
    }


    _handleClick(e) {
        e.preventDefault();
        this.setState({newTodo: false, editView: true, current: {
            id: this.props.tasks.get(e.target.id).id,
            name: this.props.tasks.get(e.target.id).obj,
        }
        });
    }

    handleDelete(e) {
        e.preventDefault();
        this.props.actions.deleteTask(this.state.current.id)
        this.setState({editView: false});
    }
    
    _toggleState(e) {
        e.preventDefault();
        this.setState({newTodo: !this.state.newTodo});
    }
    render() {
        const { tasks, actions } = this.props;
        return (

            <div className="parent">
            <div className="column" style={{background: '#AAAAAA'}}>
            <h5> sidebar </h5>
            <h5> todo </h5>
            </div>
            <div className="column">
            <input type="button" 
            className="add-todo"
            value="add todo" 
            onClick={this._toggleState}
            />
            {this.state.newTodo ? <TodoComposer addTask={actions.addTask}/> : null}
            <TodoSection tasks={tasks} actions={actions} handleClick={this._handleClick} />
            </div>
            <div className="column">
            {this.state.editView ? <TodoEdit actions={actions} current={this.state.current} handleDelete={this.handleDelete}/> : null}
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
