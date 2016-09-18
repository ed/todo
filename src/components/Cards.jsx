import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Boards from '../containers/Boards';


@DragDropContext(HTML5Backend)
export default class Cards extends Component {
  render() {
    return (
      <div style={{display: 'flex'}}>
        <Boards id={0} val={this.props.val} date={this.props.date} onClick={this.props.onClick} update={this.props.update}/>
        <Boards id={1} val={this.props.val} date={this.props.date} onClick={this.props.onClick} update={this.props.update}/>
        <Boards id={2} val={this.props.val} date={this.props.date} onClick={this.props.onClick} update={this.props.update}/>
      </div>
    );
  }
}
