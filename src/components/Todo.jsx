import React, { Component } from 'react';
var ReactPropTypes = React.PropTypes;

class Todo extends Component {
    propTypes: {
        todo: ReactPropTypes.object,
        handleClick: ReactPropTypes.func, 
        idx: ReactPropTypes.Number
    };

    render (){
        var todo = this.props.todo;
        var idx = this.props.idx;
        var handleClick = this.props.handleClick;
        return (
            <li className="todo-list-item">
                <h5 className="todo-name">
                    <a href="#" id={idx} onClick={(e) => handleClick(e)}>
                        {todo} 
                    </a>
                </h5>
            </li>
        );
    }
}

export default Todo;
