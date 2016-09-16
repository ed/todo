import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Board from './Board';
import Boards from '../containers/Boards';


@DragDropContext(HTML5Backend)
export default class Cards extends Component {
  render() {
    return (
      <div style={{display: 'flex'}}>
        <Boards id={0} onClick={this.props.onClick} update={this.props.update}/>
        <Boards id={1} onClick={this.props.onClick} update={this.props.update}/>
        <Boards id={2} onClick={this.props.onClick} update={this.props.update}/>
      </div>
    );
  }
}
