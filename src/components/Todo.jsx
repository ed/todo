import React, { Component } from 'react';
var ReactPropTypes = React.PropTypes;

class Todo extends Component {
    propTypes: {
        todo: ReactPropTypes.object,
        idx: ReactPropTypes.Number
    };


    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);

    };

    _handleClick(e) {
        e.preventDefault();
        console.log(e.target.id);
    }

    render (){
        var todo = this.props.todo;
        var idx = this.props.idx;
        return (
            <li className="todo-list-item">
                <h5 className="todo-name">
                    <a href="#" id={idx} onClick={(e) => this._handleClick(e)}>
                        {todo} 
                    </a>
                </h5>
            </li>
        );
    }
}

export default Todo;
