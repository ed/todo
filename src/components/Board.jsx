import React, { PropTypes, Component } from 'react';
import { CARD } from '../constants/ItemTypes';
import { DropTarget } from 'react-dnd';
import Card from '../components/Card'
import { outOfWeek, isInWeek, tttf } from '../utils/TimeUtils'


const Infinite = require('react-infinite');


const cardTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem().id, props.id)
  }
};

@DropTarget(CARD, cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))

export default class Board extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    cards: PropTypes.object.isRequired,
  };

  render() {
    const { canDrop, isOver, connectDropTarget, cards, onClick,edit } = this.props;
    const isActive = canDrop && isOver;
    return connectDropTarget(
      <div className="card">
        <Infinite containerHeight={350} elementHeight={40} >
          <ul>
            {cards.map(c => 
              <li key={c.id} id={c.id} onClick={(e) => onClick(e)} style={{cursor: '-webkit-grab'}}>
                <Card id={c.id} text= {isInWeek(c.date) ? `${c.time} ${c.name}` : `${c.name}${c.tags ? `#${c.tags.toUpperCase()}` : ''} ${outOfWeek(c.date)} ${c.time}`} prio={c.prio} update={edit} done={c.done} />
              </li>
            )}
          </ul>
        </Infinite>
      </div>
    );
  }
};

