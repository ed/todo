import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import NoteUtils from 'utils/NoteUtils';

export default class NoteComposer extends Component {

    propTypes: {
        channel: React.PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);
        this._onSubmit=this._onSubmit.bind(this);
        this._onChange=this._onChange.bind(this);
        this.state = {
            name: '',
            content: '',
            tags: ''
        }
    }

    render() {
        return (
            <div className="note-parent">
                <textarea
                    className="note-name-setter"
                    id="name"
                    value={this.state.name}
                    maxLength="20"
                    onChange={this._onChange}
                />
                <br></br>
                <textarea
                    className="note-content-setter"
                    id="content"
                    value={this.state.content}
                    maxLength="20"
                    onChange={this._onChange}
                />
                <br></br>
                <textarea
                    className="note-tags-setter"
                    id="tags"
                    value={this.state.tags}
                    maxLength="20"
                    onChange={this._onChange}
                />
                <br></br>
                <button
                    className="note-create"
                    onClick={this._onSubmit}
                    value="new note"
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
        if(this.state.name && this.state.content) {
            NoteUtils.createNote(this.state);
            this.state = {
                name: '',
                content: '',
                tags: ''
            }
        }
        else
            alert("please fill out name and content");
    }
};


