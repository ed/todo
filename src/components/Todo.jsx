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
                <h5 className="todo-name">
                    <a href="#" id={idx} onClick={(e) => handleClick(e)}>
						{todo}
                    </a>
                </h5>
        );
    }
}

export default Todo;
