import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import TodoComposer from './TodoComposer';
import Todo from './Todo';

class TodoSection extends Component {


    constructor(props) {
        super(props);
    };


    render() {
        const { tasks, actions } = this.props;
        return (
            <div className="todo-section">
                <ul className="todo-list" ref="todoList">
                    {tasks.entrySeq().map( ([key, value]) =>
                    <Todo key={value.id} todo={value.obj} idx={key} />)}
                </ul>
            </div>
        );
    }
};

export default TodoSection;
