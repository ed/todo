import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import TodoComposer from './TodoComposer';
import Todo from './Todo';

class TodoSection extends Component {


    constructor(props) {
        super(props);
        const { handleClick, tasks, actions } = this.props;
    };

    render() {
        var handleClick = this.props.handleClick;
        return (
            <div className="todo-section">
                <ul className="todo-list" ref="todoList">
                    {this.props.tasks.entrySeq().map( ([key, value]) =>
                    <Todo key={value.id} todo={value.obj} idx={key} handleClick={handleClick} />)}
                </ul>
            </div>
        );
    }
};

export default TodoSection;
