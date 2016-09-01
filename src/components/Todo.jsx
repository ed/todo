import React, { Component } from 'react';
var ReactPropTypes = React.PropTypes;

class Todo extends Component {
    propTypes: {
        todo: ReactPropTypes.object
    };

    render (){
        var todo = this.props.todo;
        return (
            <li clasName="todo-list-item">
                <h5 className="todo-name">
                    {todo}
                </h5>
            </li>
        );
    }
}

export default Todo;
