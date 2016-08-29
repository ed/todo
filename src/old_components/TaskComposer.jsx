import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import TaskUtils from 'utils/TaskUtils';

class TaskComposer extends Component {

    propTypes: {
        channel: React.PropTypes.string.isRequired,
    }


    constructor(props) {
        super(props);
        this._onSubmit=this._onSubmit.bind(this);
        this._onChange=this._onChange.bind(this);
        this.state = {
            name: '',
            dueDate: '',
            tags: '',
            prio: '',
            drawing: '',
            assigned: '',
            subTasks: '' 
        }
    }

    render() {
        return (
            <div className="form-parent">
                <textarea
                    className="task-name-setter"
                    id="name"
                    value={this.state.name}
                    maxLength="20"
                    onChange={this._onChange}
                />
                <br></br>
                <textarea
                    className="task-dueDate-setter"
                    id="dueDate"
                    value={this.state.dueDate}
                    maxLength="20"
                    onChange={this._onChange}
                />
                <br></br>
                <textarea
                    className="task-tags-setter"
                    id="tags"
                    value={this.state.tags}
                    maxLength="20"
                    onChange={this._onChange}
                />
                <br></br>
                <textarea
                    className="task-drawing-setter"
                    id="drawing"
                    value={this.state.drawing}
                    onChange={this._onChange}
                    maxLength="20"
                />
                <br></br>
                <textarea
                    className="task-assigned-setter"
                    id="assigned"
                    value={this.state.assigned}
                    onChange={this._onChange}
                    maxLength="20"
                />
                <br></br>
                <textarea
                    className="task-subTasks-setter"
                    id="subTasks"
                    value={this.state.subTasks}
                    onChange={this._onChange}
                    maxLength="20"
                />
                <textarea
                    className="task-prio-setter"
                    id="subTasks"
                    value={this.state.prio}
                    onChange={this._onChange}
                    maxLength="20"
                />
                <br></br>
                <button
                    className="task-create"
                    onSubmit={this._onSubmit}
                    value="new task"
                />
            </div>
        );
    }

    _onChange(e, value) {
        e.preventDefault();
        this.setState({[e.target.id]: e.target.value});
    };

    _onSubmit(e) {
        e.preventDefault();
        {/* TaskUtils.createTask(hash, this.state.name.trim(), this.state.dueDate.trim(), this.state.drawing.trim(), this.state.assigned.trim(), this.state.subTasks.trim(), this.state.tags.trim()) */}
        TaskUtils.createTask(hash, this.state);
        this.setState = {
            name: '',
            dueDate: '',
            tags: '',
            prio: '',
            drawing: '',
            assigned: '',
            subTasks: '' 
        }
    }
};

export default TaskComposer;
