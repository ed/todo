import React, { Component } from 'react';
var ReactPropTypes = React.PropTypes;

class Task extends Component {
    propTypes: {
        task: ReactPropTypes.object
    };

    render (){
        var task = this.props.task;
        return (
            <li className="task-list-item">
            <h2 className="task-name">{task.name}</h2>
            <div className="task-assigned">{task.assigned}</div>
            <div className="task-due-date"> {task.dateDue}</div>
            <div className="task-sub-tasks">{task.subTasks}</div>
            <div className="task-drawing">{task.drawing}</div>
            <div className="task-date-created"> {task.dateDue}</div>
            <div className="task-tags"> {task.dateDue}</div>
            </li>
        );
    }
}

export default Task;
