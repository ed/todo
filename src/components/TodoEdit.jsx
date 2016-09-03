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
        this.setState({[e.target.id]: e.target.value, writing: true});
    };


    _onKeyDown(e) {
        if (e.keyCode === 8) {
            e.target.value = e.target.value.substr(0, e.target.value.length-1) 
            this.props.current[e.target.id] = e.target.value.trim();
        }
        else if (e.keyCode === 9) {
            e.preventDefault();
            console.log('tab');
        }
        else if (e.keyCode === 13) {
            e.preventDefault();
            let temp = {
                [e.target.id]: e.target.value.trim()
            }
            if (temp.name) {
                this.props.current.name = temp.name;
            }
            if (e.target.value) {
                this.props.current[e.target.id] = e.target.value.trim();
                this.props.actions.editTodo(this.props.current.id, temp);
                this.setState({[e.target.id]: '', writing:false});
            }
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
                    <h2> {current.name} </h2>
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
