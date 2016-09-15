import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Board from '../components/Board';
import Card from '../components/Card';

@DragDropContext(HTML5Backend)
export default class Cards extends Component {
  render() {
    return (
      <div style={{display: 'flex'}}>
          <Board id={0} onClick={this.props.onClick} update={this.props.update} contents={this.props.z}/>
          <Board id={1} onClick={this.props.onClick} update={this.props.update} contents={this.props.o}/>
          <Board id={2} onClick={this.props.onClick} update={this.props.update} contents={this.props.t}/>
      </div>
    );
  }
}
