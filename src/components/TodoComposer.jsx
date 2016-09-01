import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';


class TodoComposer extends Component {
    constructor(props) {
        super(props);
        this._onKeyDown=this._onKeyDown.bind(this);
        this._onChange=this._onChange.bind(this);
        this.state = {name: ''};
    }

    render() {
        return (
            <textarea
                className="todo-name-setter"
                id="name"
                value={this.state.name}
                ref="tsetter"
                onChange={this._onChange}
                onKeyDown={this._onKeyDown}
            />
        );
    }

    _onChange(e, value) {
        e.preventDefault();
        this.setState({name: e.target.value});
    };

    _onKeyDown(e) {
        if (!(event.ctrlKey || event.metaKey || event.altKey)) {
            findDOMNode(this.refs.tsetter).focus(); 
        }
        if (e.keyCode === 13) {
            e.preventDefault();
            let text = this.state.name.trim();
            if (text)
                this.props.addTask(text, "todo");
            this.setState({name: ''});
        }
    }
}

TodoComposer.propTypes = {
    addTask: PropTypes.func.isRequired
}

export default TodoComposer;
