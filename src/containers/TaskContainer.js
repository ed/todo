import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as TaskActions from '../actions/TaskActions';
import TodoSection from '../components/TodoSection';
import TodoEdit from '../components/TodoEdit';
import { bindActionCreators } from 'redux';
import {Router, browserHistory} from 'react-router';


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
        this.sections = []
    }

    componentDidMount() {
        const { dispatch } = this.props;
    }


    _handleClick(e) {
        e.preventDefault();
        let temp = this.props.tasks.get(e.target.id);
        this.current = {
            id: temp.get('id'),
            name: temp.get('name'),
            dueDate: temp.get('dueDate'),
            tags: temp.get('tags'),
            prio: temp.get('prio'),
            users: temp.get('users'),
            sub: temp.get('sub')
        }
        this.setState({editView: true});
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
            <div className="sidebar" style={{background: '#7FDBFF'}}>
            <h5> sidebar </h5>
            <h5> todo </h5>
            </div>
            <div className="column" style={{background: '#FFFFFF'}}>
            <TodoSection sections={this.sections} tasks={tasks} actions={actions} handleClick={this._handleClick} />
            </div>
            {this.state.editView ? <TodoEdit actions={actions} current={this.current} handleDelete={this.handleDelete}/> : null}
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
