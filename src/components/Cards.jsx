import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Boards from '../containers/Boards';


@DragDropContext(HTML5Backend)
export default class Cards extends Component {
  constructor(props) {
    super(props)
    this._onDrop = this._onDrop.bind(this);
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <Boards id={0} onDrop={this._onDrop} val={this.props.val} date={this.props.date} onClick={this.props.onClick} edit={this.props.edit}/>
        <Boards id={1} onDrop={this._onDrop} val={this.props.val} date={this.props.date} onClick={this.props.onClick} edit={this.props.edit}/>
        <Boards id={2} onDrop={this._onDrop} val={this.props.val} date={this.props.date} onClick={this.props.onClick} edit={this.props.edit}/>
      </div>
    );
  }

  _onDrop(iid, pid) {
    this.props.update(iid, pid);
  }
}
