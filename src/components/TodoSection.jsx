import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Todo from './Todo';
import { Glyph, Modal, ModalBody, ModalHeader, ModalFooter, Button, Dropdown} from 'elemental';
import 'elemental/less/elemental.less'

class TodoSection extends Component {

	constructor(props) {
		super(props);
		const { handleClick, tasks, actions, sections, editOff, views } = this.props;
		this.onClick = this.onClick.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
		this.state = {
			key: 0,
			max: 0,
			showModal: false,
			section: '',
			name: ''
		}
	};

	close() {
		this.setState({ showModal: false });
	}

	open() {
		this.setState({ showModal: true });
	}

	handleSelect(key) {
		this.props.editOff()
		if (key == "new")
			this.open();
		else
			this.setState({ key });
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

	onClick(e) {
		e.preventDefault();
		if (this.state.section == '')
			this.close()
	}

	render() {
		var handleClick = this.props.handleClick;
		return (
			<div className="todo-section">
				<textarea
					autoFocus
					className="todo-name-setter"
					id="name"
					value={this.state.name}
					onChange={this.onChange}
					onKeyDown={this.onKeyDown}
					/>
				<ul className="agenda">
					{this.props.agenda.map((day, idx) =>
						<ul key={idx}> {day}
							{this.props.tasks.filter(task => task.get('dueDate') == day).entrySeq().map(([key, value]) =>
								<li key={key}>
									{value.get('time') }
									{value.get('task').toUpperCase() }
									<Todo key={value.get('id') } tags={value.get('tags').toUpperCase() } todo={value.get('name') } idx={key} handleClick={handleClick} />
									{value.get('tags').toUpperCase() }
								</li>) }
						</ul>) }
				</ul>
				<ul className="todo-list" ref="todoList">
					{this.props.tasks.filter(task => task.get('location') == 'main').entrySeq().map(([key, value]) =>
						<Todo key={value.get('id') } todo={value.get('name') } idx={key} handleClick={handleClick} />) }
				</ul>
			</div>
		);
	}
};

export default TodoSection;
