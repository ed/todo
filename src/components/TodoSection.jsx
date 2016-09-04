import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import TodoComposer from './TodoComposer';
import Todo from './Todo';

class TodoSection extends Component {


    constructor(props) {
        super(props);
        const { handleClick, tasks, actions } = this.props;
        this.onClick = this.onClick.bind(this);
    };

    onClick(e) {
        this.props.actions.createList('test');
    }

    render() {
        var handleClick = this.props.handleClick;
        return (
            <div className="todo-section">
                <input type="button" key="test" value="create list" onClick={(e) => this.onClick(e)}/>
                <ul className="todo-list" ref="todoList">
                    {this.props.tasks.entrySeq().map( ([key, value]) =>
                    <Todo key={value.get('id')} todo={value.get('name')} idx={key} handleClick={handleClick} />)}
                </ul>
            </div>
        );
    }
};

export default TodoSection;
