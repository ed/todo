import React, { Component } from 'react';
var ReactPropTypes = React.PropTypes;

class Meeting extends Component {
    propTypes: {
        meeting: ReactPropTypes.object
    };

    render (){
        var meeting = this.props.meeting;
        return (
            <li className="meeting-list-item">
            <h2 className="meeting-with">{meeting.with}</h2>
            <div className="meeting-type">{meeting.type}</div>
            <div className="meeting-start"> {meeting.start}</div>
            <div className="meeting-end">{meeting.end}</div>
            <div className="meeting-tags"> {meeting.tags}</div>
            </li>
        );
    }
}

export default Meeting;
