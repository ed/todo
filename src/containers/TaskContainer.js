import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import React, { Component } from 'react';
import * as TaskActions from '../actions/TaskActions';
import TodoSection from '../components/TodoSection';
import TodoEdit from '../components/TodoEdit';
import Todo from '../components/Todo';
import { bindActionCreators } from 'redux';
import {Router, browserHistory} from 'react-router';
import {hyphenate, agenda} from '../utils/GeneralUtils'


class App extends Component {
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.editOff = this.editOff.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
        this.state = {
            editView: false,
			viewing: '',
			name: ''
        }
        this.current = {
            id: '',
            name: '',
            dueDate: '',
            tags: '',
			time: '',
            prio: '',
            users: '',
            sub: ''
        }
        this.sections = [{
            val: "main",
            key: "s0"
		}]
		this.sections.push({val:"2", key:"s1"})
		this.week = agenda();
    }

    
    editOff() {
        this.setState({ editView: false });
	}

	onChange(e) {
		e.preventDefault();
		this.setState({ [e.target.id]: e.target.value });
	};

	onKeyDown(e) {
		if (e.keyCode === 13) {
			e.preventDefault();
			if (e.target.value) {
				this.setState({ [e.target.id]: e.target.value });
				if ([e.target.id] == 'name') {
					this.props.actions.addTask(e.target.value, "todo");
					this.setState({ name: '' });
				}
				else if ([e.target.id] == 'section') {
					this.close();
					let obj = {
						val: this.state.section,
						key: this.state.max + 1
					}
					this.props.sections.push(obj)
					this.handleSelect(obj.key)
					this.setState({ section: '', max: obj.key })
				}
			}
		}
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
        this.setState({ viewing: this.current.name })
        if (this.state.viewing == this.current.name)
            this.setState({ editView: !this.state.editView });
        else
            this.setState({ editView: true });
    }

    handleDelete(e) {
        e.preventDefault();
        this.props.actions.deleteTask(this.current.id)
        this.setState({ editView: false });
    }

    onClick(e) {
		e.preventDefault();
		findDOMNode(this._input).focus();
        if (this.state.editView == true && e.target.id=="")
            this.editOff();
    }

    render() {
        const { tasks, actions } = this.props;
		return (
			<div className="Grid Grid--flexCells">
				<div className="Grid-cell u-1of4" id="nav-panel">
					sidebar
				</div>
				<div className="Grid-cell" style={{padding: '10px'}}>
				<div className="Grid-cell">
				<textarea
					autoFocus
					className="todo-name-setter"
					id="name"
					maxLength={30}
					ref={(c) => this._input = c}
					value={this.state.name}
					onChange={this.onChange}
					onKeyDown={this.onKeyDown}
				/>
				{tasks.entrySeq().map(([key, value]) => <Todo key={value.get('id') } todo={value.get('name') } idx={key} handleClick={this._handleClick} />) }
				</div>
                <div className="Grid-cell" >
                {this.state.editView ? <TodoEdit editOff={this.editOff} hyphenate={hyphenate} sections={this.sections} actions={actions} current={this.current} handleDelete={this.handleDelete}/> : null}
			</div>
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
