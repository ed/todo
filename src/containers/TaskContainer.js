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
        this._handleClick = this._handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            editView: false
        }
        this.current = {
            id: '',
            name: '',
            dueDate: '',
            tags: '',
            prio: '',
            users: '',
            sub: ''
        }
    }


    _handleClick(e) {
        e.preventDefault();
        let temp = this.props.tasks.get(e.target.id);
        this.setState({editView: true});
        this.current = {
            id: temp.get('id'),
            name: temp.get('name'),
            dueDate: temp.get('dueDate'),
            tags: temp.get('tags'),
            prio: temp.get('prio'),
            users: temp.get('users'),
            sub: temp.get('sub')
        }
    }

    handleDelete(e) {
        e.preventDefault();
        this.props.actions.deleteTask(this.current.id)
        this.setState({editView: false});
    }

    render() {
        const { tasks, actions } = this.props;
        return (
            <div className="parent">
            <div className="sidebar" style={{background: '#01FF70'}}>
            <h5> sidebar </h5>
            <h5> todo </h5>
            </div>
            <div className="column" style={{background: '#7FDBFF'}}>
            <TodoComposer addTask={actions.addTask}/>
            <TodoSection tasks={tasks} actions={actions} handleClick={this._handleClick} />
            </div>
            <div className="column" style={{background: '#FFFFFF'}}>
            {this.state.editView ? <TodoEdit actions={actions} current={this.current} handleDelete={this.handleDelete}/> : null}
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
