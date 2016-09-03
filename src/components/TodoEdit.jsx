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
            name: '',
            dueDate: '',
            tags: '',
            prio: '',
            users: '',
            sub: ''
        }
    };

    _onChange(e, value) {
        e.preventDefault();
        this.setState({[e.target.id]: e.target.value});
    };


    _onKeyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            let temp = {
                [e.target.id]: e.target.value.trim()
            }
            if (temp)
                this.props.actions.editTodo(this.props.current.id, temp);
            this.props.current.name = this.state.name
            this.setState({[e.target.id]: ''});
        }
    }



    render() {
        let handleDelete = this.props.handleDelete;
        let arr = [];
        for (var i in this.state) {
            let obj = {
                cname: "todo-"+i+"-setter",
                def: "set " + i,
                val: i
            }
            arr.push(obj);
        }
        return (
            <div className="edit-list">
                <div className="edit-buttons">
                    <input type="button" className = "delete-task" value="delete task" onClick={(e) => handleDelete(e)}/>
                </div>
                <div className="edit-column">
                    <h2> {this.props.current.name} </h2>
                    <ul className="edit-list-tems">
                        {arr.map( (obj, key) =>
                                 <Edit key={key} onKeyDown = {this._onKeyDown} onChange={this._onChange} id={obj.val} val={this.state[obj.val]} def={obj.def} cname={obj.cname}/>)}
                             </ul>
                         </div>

                     </div>
        )
    }

}

export default TodoEdit
