import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Edit from './Edit';

class TodoEdit extends Component {

    constructor(props) {
        super(props);
        const { handleDelete, current , actions } = this.props;
        this._onChange = this._onChange.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this.state = {
            writing: false,
            name: '',
            dueDate:'',
            tags: '',
            prio: '',
            users:'',
            sub: '',
        }
        this.arr = []
        for (var i in current) {
            if (i=="id")
                continue
            let obj = {
                cname: "todo-"+i+"-setter",
                def: "set " + i,
                val: i
            }
            this.arr.push(obj);
        }
    };

    _onChange(e, value) {
        e.preventDefault();
        this.setState({[e.target.id]: e.target.value});
        this.props.current[e.target.id] = e.target.value;
    };


    _onKeyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            let temp = {
                [e.target.id]: e.target.value.trim()
            }
            if (e.target.value) {
                this.props.actions.editTodo(this.props.current.id, temp);
                this.props.current[e.target.id] = e.target.value;
                this.setState({[e.target.id]: ''});
            }
            let idx = this.arr.findIndex ( ptr => ptr.val == [e.target.id] )
            if (idx+1 == this.arr.length)
                document.getElementById(this.arr[idx].val).focus();
            else if (idx+1 < this.arr.length) 
                document.getElementById(this.arr[idx+1].val).focus();
        }
    }

    render() {
        let handleDelete = this.props.handleDelete;
        let arr = [];
        const { current } = this.props
        return (
            <div className="edit-list">
                <div className="edit-buttons">
                    <input type="button" className = "delete-task" value="delete task" onClick={(e) => handleDelete(e)}/>
                </div>
                <div className="edit-column">
                    <h5> {current.name} </h5>
                    <ul className="edit-list-tems">
                        {this.arr.map( (obj, key) =>
                                      <Edit key={key} onKeyDown = {this._onKeyDown} onChange={this._onChange} id={obj.val} val={current[obj.val] || this.state[obj.val]} def={obj.def} cname={obj.cname}/>)}
                                  </ul>
                              </div>

                          </div>
        )
    }

}

export default TodoEdit
