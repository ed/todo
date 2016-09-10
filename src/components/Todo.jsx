import React, { Component } from 'react';
const ReactPropTypes = React.PropTypes;
import { findDOMNode } from 'react-dom';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group')
let moment = require('moment');

export default class Todo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editView: false,
			inputTodo: '',
			viewing: '',
			name: '',
			id: '',
			name: '',
			dueDate: '',
			tags: '',
			time: '',
			prio: '',
			users: '',
			sub: ''
		}
		this.onClick = this.onClick.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
	}

	onChange(e) {
		e.preventDefault();
		this.setState({ [e.target.id]: e.target.value });
	};

	onKeyDown(e) {
		if (e.keyCode === 13) {
			e.preventDefault();
			if (e.target.value) {
				let temp = {
					[e.target.id]: e.target.value.trim()
				}
				this.setState({ [e.target.id]: e.target.value });
				if ([e.target.id] == 'inputTodo') {
					this.props.actions.addTask(e.target.value, "todo");
					this.setState({ inputTodo: '' });
				}
				else {
					this.props.actions.editTodo(this.state.id, temp);
				}

				if (this.state.editView == true) {
					let idx = this.props.editList.findIndex(ptr => ptr.val == [e.target.id])
					if (idx + 1 == this.props.editList.length)
						document.getElementById(this.props.editList[idx].val).focus();
					else if (idx + 1 < this.props.editList.length)
						document.getElementById(this.props.editList[idx + 1].val).focus();
				}
				/* else if (String([e.target.id]).replace(/\d/g,'') == 'sub') { */
				/* 	}); */
				/* } */
			}
		}
	}

	onClick(e) {
		e.preventDefault();
		let temp = this.props.tasks.get(e.target.id);
		this.setState({
			id: temp.get('id'),
			name: temp.get('name'),
			dueDate: temp.get('dueDate'),
			tags: temp.get('tags'),
			prio: temp.get('prio'),
			users: temp.get('users'),
			sub: temp.get('sub')
		})
		if (temp.get('id') == this.state.id) {
			this.setState({ editView: !this.state.editView });
		}
		else {
			this.setState({ editView: true });
		}
	}

	handleDelete(e) {
		e.preventDefault();
		this.props.actions.deleteTask(this.state.id)
		this.setState({ editView: false });
	}

	render() {
		const { tasks } = this.props;
		const todos = tasks.entrySeq().map(([key, value]) => <a href="#" key={value.get('id')} id={key} onClick={(e) => this.onClick(e)}> {value.get('name')} </a>)
		return (
			<div className="Grid Grid--flexCells">
				<div className="Grid-cell u-1of4" id="nav-panel">
					sidebar
				</div>
				<div className="Grid-cell" style={{padding: '10px'}}>
					<div className="Grid-cell">
						<textarea
							className="todo-name-setter"
							id="inputTodo"
							maxLength={30}
							ref={(c) => this._input = c}
							value={this.state.inputTodo}
							onChange={this.onChange}
							onKeyDown={this.onKeyDown}
							placeholder="event name"
						/>
						{todos}
					</div>
					<div className="Grid-cell">
						<ReactCSSTransitionGroup 
							transitionName="edittrans" 
							transitionEnterTimeout={500} 
							transitionLeaveTimeout={300}>
							{this.state.editView ? <TodoEdit arr={this.props.editList} onChange={this.onChange} onKeyDown={this.onKeyDown} state={this.state} handleDelete={this.handleDelete}/> : null}
						</ReactCSSTransitionGroup>
					</div>
				</div>
			</div>
		)
	}
}


class TodoEdit extends Component {
	render() {
		const {handleDelete, onChange, onKeyDown, arr, state} = this.props;
		const edits = arr.map((obj, key) => <textarea className={obj.cname} key={key} id={obj.val} value={state[obj.val]} placeholder={obj.def} maxLength="20" onChange={(e) => onChange(e)} onKeyDown={(e) => onKeyDown(e)} />)
		return (
			<div>
				<input type="button" onClick={(e) => handleDelete(e)}/> 
				<p>{state.name}</p>
				{edits}
			</div>
		)
	}
}

