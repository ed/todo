import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Boards from '../containers/Boards';
import GoPlus from 'react-icons/lib/go/plus';


@DragDropContext(HTML5Backend)
export default class Cards extends Component {
  constructor(props) {
    super(props)
    this._onDrop = this._onDrop.bind(this);
    this._newCard = this._newCard.bind(this);
    this.close = this.close.bind(this);
  }

  render() {
    const {...props} = this.props;
    return (
      <div id="cards" style={{display: 'flex', flex: '1 1 0'}}>
        {props.cards.entrySeq().map(([key,val]) => 
          <Boards cardName={val.name} close={this.close} card={val.id} onDrop={this._onDrop} {...props} />
        )}
        <span id="new card" onClick={this._newCard}>
          <GoPlus size={30}/>
        </span>
      </div>
    );
  }

  _newCard() {
    const name = prompt('new card name')
    console.log(name)
    this.props.actions.addCard(name)
  }

  close(e) {
    if (confirm(`delete ${this.props.cards.get(e.target.id).name} ?`)) {
      if(this.props.cards.size === 1)
        alert("sorry dave i can't do that")
      else
        this.props.actions.fullDeleteCard(e.target.id)
    }
  }

  _onDrop(iid, pid) {
    this.props.update(iid, pid);
  }
}
