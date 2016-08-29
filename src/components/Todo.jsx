import React, { Component } from 'react';
var ReactPropTypes = React.PropTypes;

class Todo extends Component {
    propTypes: {
        todo: ReactPropTypes.object
    };

    render (){
        var todo = this.props.todo;
        return (
            <li className="todo-list-item">
            <h2 className="todo-name">{todo.name}</h2>
            <br></br>
            <div className="todo-due-date"> {todo.dateDue}</div>
            <br></br>
            <div className="todo-priority">{todo.priority}</div>
            <br></br>
            <div className="todo-tags"> {todo.tags}</div>
            </li>
        );
    }
}

export default Todo;
