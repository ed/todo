import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import MeetingUtils from 'utils/MeetingUtils';

class MeetingComposer extends Component {

    propTypes: {
        channel: React.PropTypes.string.isRequired,
    }


    constructor(props) {
        super(props);
        this._onSubmit=this._onSubmit.bind(this);
        this._onChange=this._onChange.bind(this);
        this.state = {
            type: '',
            with: '',
            start: '',
            end: '',
            tags: ''
        }
    }

    render() {
        return (
            <div className="form-parent">
                <textarea
                    className="meeting-type-setter"
                    id="tags"
                    value={this.state.tags}
                    maxLength="20"
                    onChange={this._onChange}
                />
                <br></br>
                <textarea
                    className="meeting-with-setter"
                    id="with"
                    value={this.state.with}
                    maxLength="20"
                    onChange={this._onChange}
                />
                <br></br>
                <textarea
                    className="meeting-start-setter"
                    id="start"
                    value={this.state.start}
                    maxLength="20"
                    onChange={this._onChange}
                />
                <br></br>
                <textarea
                    className="meeting-end-setter"
                    id="end"
                    value={this.state.end}
                    onChange={this._onChange}
                    maxLength="20"
                />
                <br></br>
                <textarea
                    className="meeting-tags-setter"
                    id="tags"
                    value={this.state.tags}
                    maxLength="20"
                    onChange={this._onChange}
                />
                <br></br>
                <button
                    className="meeting-create"
                    onSubmit={this._onSubmit}
                    value="new meeting"
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
        MeetingUtils.createMeeting(hash, this.state);
        this.setState = {
            type: '',
            with: '',
            start: '',
            end: '',
            tags: ''
        }
    }
};

export default MeetingComposer;
