import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Edit from './Edit';
import { Glyph, Modal, ModalBody, ModalHeader, ModalFooter, Button, Dropdown} from 'elemental';
let moment = require('moment');
import { SingleDatePicker } from 'react-dates'
import 'react-dates/css/styles.scss'
import 'react-dates/css/variables.scss'
import 'elemental/less/elemental.less'


class TodoEdit extends Component {

	constructor(props) {
		super(props);
		const { handleDelete, current, actions, hyphenate, sections, editOff} = this.props;
		this._onChange = this._onChange.bind(this);
		this._onKeyDown = this._onKeyDown.bind(this);
		this.handleMove = this.handleMove.bind(this);
		this.handleTime = this.handleTime.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.onDateChange = this.onDateChange.bind(this);
		this.onFocusChange = this.onFocusChange.bind(this);
		this.state = {
			writing: false,
			name: '',
			focused: false,
			dueDate: null,
			time: '',
			tags: '',
			prio: '',
			users: '',
			sub: '',
			showModal: false
		}
		this.arr = []
		for (var i in current) {
			if (i == "id" || i=="dueDate")
				continue
			let ih = this.props.hyphenate(i)
			let obj = {
				cname: "todo-" + ih + "-setter",
				def: "set " + ih,
				val: i
			}
			this.arr.push(obj);
		}
		this.time = [{label: "12:00am"}, {label: "12:30am"}]
		for (var i = 1 ; i < 12; i++) {
			this.time.push({label: i+":00am"})
			this.time.push({label: i+":30am"})
		}
		this.time.push({label: "12:00pm"})
		this.time.push({label: "12:30pm"})
		for (var i = 1 ; i < 12; i++) {
			this.time.push({label: i+":00pm"})
			this.time.push({label: i+":30pm"})
		}
	};


	handleMove(e) {
		e.preventDefault();
		this.props.actions.moveTo(this.props.current.id, [e.target.id])
		this.props.editOff();
	}

	handleTime(e) {
		if (e.target.outerHTML != "Set Time")
			this.setState({time: e.target.outerText})
	}

	onDateChange(dueDate) {
		this.setState({ dueDate });
	}

	onFocusChange({ focused }) {
		this.setState({ focused });
	}

	toggleModal() {
		this.setState({showModal: !this.state.showModal});
	}

	_onChange(e, value) {
		e.preventDefault();
		this.setState({ [e.target.id]: e.target.value });
		this.props.current[e.target.id] = e.target.value;
	};

	handleSubmit() {
		let date = moment(this.state.dueDate).format('DD MMMM Y')
		this.props.current.dueDate = date;
		this.props.current.time = this.state.time;
		let obj = { 
			dueDate: date,
			time: this.state.time
		}
		this.props.actions.editTodo(this.props.current.id, obj);
		this.toggleModal();
	}

	_onKeyDown(e) {
		if (e.keyCode === 13) {
			e.preventDefault();
			let temp = {
				[e.target.id]: e.target.value.trim()
			}
			if (e.target.value) {
				this.props.actions.editTodo(this.props.current.id, temp);
				this.props.current[e.target.id] = e.target.value;
				this.setState({ [e.target.id]: '' });
			}
			let idx = this.arr.findIndex(ptr => ptr.val == [e.target.id])
			if (idx + 1 == this.arr.length)
				document.getElementById(this.arr[idx].val).focus();
			else if (idx + 1 < this.arr.length)
				document.getElementById(this.arr[idx + 1].val).focus();
		}
	}

	render() {
		let handleDelete = this.props.handleDelete;
		let arr = [];
		const { current } = this.props;
		return (
			<div>
					<Button type="link" onClick={this.toggleModal} ><Glyph icon="calendar" /></Button>
					<Button type="link" onClick={(e) => handleDelete(e)}> <Glyph icon="trashcan" type="danger"/></Button>
				<ul className="edit-list">
					{this.arr.map((obj, key) => <Edit key={key} onKeyDown = {this._onKeyDown} onChange={this._onChange} id={obj.val} val={current[obj.val] || this.state[obj.val]} def={obj.def} cname={obj.cname}/>) }
				</ul>
			</div>
		)
	}
}
export default TodoEdit
