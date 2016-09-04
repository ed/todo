import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Edit from './Edit';
import { Button, DropdownButton, MenuItem} from 'react-bootstrap'


class TodoEdit extends Component {

    constructor(props) {
        super(props);
        const { handleDelete, current, actions, hyphenate, sections, editOff} = this.props;
        this._onChange = this._onChange.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.state = {
            writing: false,
            name: '',
            dueDate: '',
            tags: '',
            prio: '',
            users: '',
            sub: '',
        }
        this.arr = []
        for (var i in current) {
            if (i == "id")
                continue
            let ih = this.props.hyphenate(i)
            let obj = {
                cname: "todo-" + ih + "-setter",
                def: "set " + ih,
                val: i
            }
            this.arr.push(obj);
        }
    };

    _onChange(e, value) {
        e.preventDefault();
        this.setState({ [e.target.id]: e.target.value });
        this.props.current[e.target.id] = e.target.value;
    };

    handleMove(e) {
        e.preventDefault();
        this.props.actions.moveTo(this.props.current.id, [e.target.id])
        this.props.editOff();
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
        const { current } = this.props
        return (
            <div className="edit-column" onClick={(e) => this.handleClick(e)} style={{ borderLeft: "thin solid #000000" }}>
                <Button bsStyle="info" className = "delete-task" onClick={(e) => handleDelete(e) }> delete {current.name}</Button>
                <ul className="edit-list">
                    {this.arr.map((obj, key) =>
                        <Edit key={key} onKeyDown = {this._onKeyDown} onChange={this._onChange} id={obj.val} val={current[obj.val] || this.state[obj.val]} def={obj.def} cname={obj.cname}/>) }
                </ul>
                <DropdownButton bsStyle="info" className="center-block" id="move-item" title="Move To">
                    {this.props.sections.map((obj) =>
                        <MenuItem key={obj.key} id={obj.val} name={obj.val} onClick={(e) => this.handleMove(e) }>{obj.val}</MenuItem>) }
                </DropdownButton>
            </div>
        )
    }

}

export default TodoEdit
