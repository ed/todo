import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Note from './Note'
import NoteComposer from './NoteComposer'

let socket = io.connect();


export default class NoteSection extends Component {

    constructor(props) {
        super(props);
        this.state = {notes: [] };
    };

    componentDidMount() {
        socket.on('add note', msg => this.setNote(msg));
    };

    render() {
        return (
            <div className="note-section">
                <ul className="note-list" ref="noteList">
                    {this.state.notes}
                </ul>
                <NoteComposer channel={'me'}/>
            </div>
        );
    }

    getNote(note) {
        return (
            <Note
                key={note.id}
                note={note}
            />
        );
    }

    setNote(msg) {
        var mv = this.state.notes.slice();
        mv.push(this.getNote(msg));
        this.setState({notes: mv});
    }
};
