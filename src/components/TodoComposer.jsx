import React, { PropTypes, Component } from 'react';


class TodoComposer extends Component {
    constructor(props) {
        super(props);
        this._onSubmit=this._onSubmit.bind(this);
        this._onChange=this._onChange.bind(this);
        this.state = {
            name: '',
            dueDate: '',
            prio: '',
            tags: '',
            done: false 
        }
    }

    render() {
        return (
            <div className="form-parent">
                <textarea
                    className="todo-name-setter"
                    id="name"
                    value={this.state.name}
                    maxLength="20"
                    onChange={this._onChange}
                />
                <br></br>
                <textarea
                    className="todo-dueDate-setter"
                    id="dueDate"
                    value={this.state.dueDate}
                    maxLength="20"
                    onChange={this._onChange}
                />
                <br></br>
                <textarea
                    className="todo-tags-setter"
                    id="tags"
                    value={this.state.tags}
                    maxLength="20"
                    onChange={this._onChange}
                />
                <br></br>
                <textarea
                    className="todo-prio-setter"
                    id="prio"
                    value={this.state.prio}
                    onChange={this._onChange}
                    maxLength="20"
                />
                <br></br>
                <input type="button"
                    className="todo-create"
                    onClick={this._onSubmit}
                    value="new todo"
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
        this.props.addTask(this.state, "todo");
        this.setState({
            name: '',
            dueDate: '',
            prio: '',
            tags: '',
            done: false 
        });
    }
}

TodoComposer.propTypes = {
    addTask: PropTypes.func.isRequired
}

export default TodoComposer;
