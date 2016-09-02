import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import TodoComposer from './TodoComposer';
import Todo from './Todo';

class TodoSection extends Component {


    constructor(props) {
        super(props);
        const { tasks, actions } = this.props;
        this._handleClick = this._handleClick.bind(this);
    };

    _handleClick(e) {
        e.preventDefault();
        console.log(this.props.tasks.get(e.target.id));
    }


    render() {
        return (
            <div className="todo-section">
                <ul className="todo-list" ref="todoList">
                    {this.props.tasks.entrySeq().map( ([key, value]) =>
                    <Todo key={value.id} todo={value.obj} idx={key} handleClick={this._handleClick} />)}
                </ul>
            </div>
        );
    }
};

export default TodoSection;
