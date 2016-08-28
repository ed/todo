import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import TaskComposer from './TaskComposer';
import TaskUtils from '../utils/TaskUtils';
import Task from './Task';
var socket = io.connect();

class TaskSection extends Component {

    constructor(props) {
        super(props);
        this.state = {tasks: [] };
    };

    componentDidMount() {
        socket.on('update add', msg => this.setTask(msg));
    };

    render() {
        return (
            <div className="task-section">
                <ul className="task-list" ref="taskList">
                    {this.state.tasks}
                </ul>
                <TaskComposer/>
            </div>
        );
    }

    getTask(task) {
        return (
            <Task
                task={task}
            />
        );
    }

    setTask(msg) {
        var mv = this.state.tasks.slice();
        mv.push(this.getTask(msg));
        this.setState({tasks: mv});
    }

};

export default TaskSection;
