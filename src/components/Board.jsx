import React, { PropTypes, Component } from 'react';
import { CARD } from '../constants/ItemTypes';
import { DropTarget } from 'react-dnd';
import Card from '../components/Card'
import { outOfWeek, isInWeek, tttf } from '../utils/TimeUtils'


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
        <ul>
          {cards.map(c => 
            <li key={c.id} id={c.idx} onClick={(e) => onClick(e)}>
              <Card id={c.id} text={isInWeek(c.date) ? `${c.time} ${c.name}` : `${outOfWeek(c.date)} ${c.time} ${c.name}`} update={edit} idx={c.idx} done={c.done} />
          </li>
        )}
      </ul>
      </div>
    );
  }
};

