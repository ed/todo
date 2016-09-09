import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Todo from './Todo';
import { Glyph, Modal, ModalBody, ModalHeader, ModalFooter, Button, Dropdown} from 'elemental';
import 'elemental/less/elemental.less'

class TodoSection extends Component {

	constructor(props) {
		super(props);
		const { handleClick, tasks, actions, sections, editOff, views } = this.props;
		this.handleSelect = this.handleSelect.bind(this);
		this.state = {
			key: 0,
			max: 0,
		}
	};

	handleSelect(key) {
		this.props.editOff()
		if (key == "new")
			this.open();
		else
			this.setState({ key });
	}


	render() {
		var handleClick = this.props.handleClick;
		return (
			<div>
				<ul className="agenda">
					{this.props.agenda.map((day, idx) =>
						<ul key={idx}> {day}
							{this.props.tasks.filter(task => task.get('dueDate') == day).entrySeq().map(([key, value]) =>
								<li key={key} style={{display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween'}}>
									{value.get('time') }
									{value.get('task').toUpperCase() }
									<Todo key={value.get('id') } tags={value.get('tags').toUpperCase() } todo={value.get('name') } idx={key} handleClick={handleClick} />
									{value.get('tags').toUpperCase() }
								</li>) }
								{idx == this.props.agenda.length-1 ? 
									this.props.sections.map((obj,ix) =>
									<ul key={ix}> {obj.val}
										{this.props.tasks.filterNot(task => task.get('dueDate') == day).filter(task => task.get('location') == obj.val).entrySeq().map(([key, value]) =>
											<li key={key} style={{display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween'}}>
												{value.get('dueDate')}
												{value.get('time') }
												{value.get('task').toUpperCase() }
												<Todo key={value.get('id') } tags={value.get('tags').toUpperCase() } todo={value.get('name') } idx={key} handleClick={handleClick} />
												{value.get('tags').toUpperCase() }
										</li>)} </ul>) : ''}
							</ul>) }

				</ul>
			</div>
		);
	}
};

export default TodoSection;
