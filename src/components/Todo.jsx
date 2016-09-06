import React, { Component } from 'react';
var ReactPropTypes = React.PropTypes;

class Todo extends Component {
    propTypes: {
        todo: ReactPropTypes.object,
        handleClick: ReactPropTypes.func, 
		idx: ReactPropTypes.Number,
		time: ReactPropTypes.String,
		tags: ReactPropTypes.String
    };

	render (){
		const { todo, handleClick, idx, time, tags } = this.props;
        return (
            <li className="todo-list-item">
                <h5 className="todo-name">
                    <a href="#" id={idx} onClick={(e) => handleClick(e)}>
						{time} {todo} {tags}
                    </a>
                </h5>
            </li>
        );
    }
}

export default Todo;
