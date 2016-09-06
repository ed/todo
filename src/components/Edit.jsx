import React, { Component } from 'react';
var ReactPropTypes = React.PropTypes;

class Edit extends Component {
    render (){
        const {onKeyDown, onChange, def , val, cname, id, handleClick} = this.props;
        return (
            <li className="edit-list-item">
                <textarea
                    className={cname}
                    id={id}
                    value={val}
                    maxLength="20"
                    placeholder={def}
                    onChange={(e) => onChange(e)}
                    onKeyDown={(e) => onKeyDown(e)}
                />
            </li>
        );
    }
}

export default Edit;


