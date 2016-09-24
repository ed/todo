import React, { PropTypes, Component } from 'react';
import { CARD } from '../constants/ItemTypes';
import { DropTarget } from 'react-dnd';
import Card from './Card'
import TodoInput from './TodoInput'
import { outOfWeek, isInWeek, tttf } from '../utils/TimeUtils'
import GoX from 'react-icons/lib/go/x';


const Infinite = require('react-infinite');


const cardTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem().id, props.card)
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
  };

  render() {
    const { canDrop, isOver, connectDropTarget, tasks, ...props} = this.props;
    const isActive = canDrop && isOver;
    return connectDropTarget(
      <div className="card" style={{overflow: 'hidden'}}>
        <div>
          <span style={{textAlign: 'center'}}>
            {props.cardName} 
          </span>
          <span style={{float: 'left'}} onClick={props.close}>
            <GoX id={props.card} size={22}/>
          </span>
        </div>
        <Infinite containerHeight={550} elementHeight={30} >
          {tasks.map(c => 
            <Card 
              id={c.id} 
              text= {isInWeek(c.date) ? 
                `${c.tags ? `#${c.tags.toUpperCase()}` : ''} ${c.time ? c.time : ''}` : `${c.tags ? `#${c.tags.toUpperCase()}` : ''} ${outOfWeek(c.date)} ${c.time ? c.time : ''}`} 
              prio={c.prio} 
              done={c.done} 
              name={c.name} 
              {...props}
            />
          )}
        </Infinite>
        <div>
          <div style={{display:'flex', justifyContent:'center'}} >
            <TodoInput
              af={true}
              id="input"
              card={props.card}
              maxLength={30}
              date={props.date}
              ref={(c) => this._input = c}
              placeholder="add todo"
              actions={props.actions}
            />
          </div>
        </div>
      </div>
    );
  }
};

