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
    const { canDrop, isOver, connectDropTarget, cards, ...props} = this.props;
    const isActive = canDrop && isOver;
    return connectDropTarget(
      <div className="card">
        <Infinite containerHeight={350} elementHeight={30} >
            {cards.map(c => 
                <Card 
                  id={c.id} 
                  text= {isInWeek(c.date) ? `${c.time} ` : `${c.tags ? `#${c.tags.toUpperCase()}` : ''} ${outOfWeek(c.date)} ${c.time}`} 
                  prio={c.prio} 
                  done={c.done} 
                  name={c.name} 
                  updateName={props.updateName}
                  update={props.edit}
                  chosen={props.chosen}
                  onClick={props.onClick}
                  actions={props.actions}
                  ro={props.ro}
                />
            )}
        </Infinite>
      </div>
    );
  }
};

