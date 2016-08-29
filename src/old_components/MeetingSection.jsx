import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import MeetingComposer from './MeetingComposer';
import MeetingUtils from '../utils/MeetingUtils';
import Meeting from './Meeting';
var socket = io.connect();

class MeetingSection extends Component {

    constructor(props) {
        super(props);
        this.state = {meetings: [] };
    };

    componentDidMount() {
        socket.on('update add', msg => this.setMeeting(msg));
        
    };

    render() {
        return (
            <div className="meeting-section">
                <ul className="meeting-list" ref="meetingList">
                    {this.state.meetings}
                </ul>
                <MeetingComposer channel={me}/>
            </div>
        );
    }

    getMeeting(meeting) {
        return (
            <Meeting
                meeting={meeting}
            />
        );
    }

    setMeeting(msg) {
        var mv = this.state.meetings.slice();
        mv.push(this.getMeeting(msg));
        this.setState({meetings: mv});
    }

};

export default MeetingSection;
