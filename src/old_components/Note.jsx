import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
var ReactPropTypes = React.PropTypes;

export default class Note extends Component {
    propTypes: {
        note: ReactPropTypes.object
    };

    render (){
        var note = this.props.note;
        return (
            <li className="note-list-item">
                <h2 className="note-name">{note.name}</h2>
                <div className="note-content">{note.content}</div>
                <div className="note-tags"> {note.tags}</div>
            </li>
        );
    }
}
