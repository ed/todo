import React, { PropTypes, Component } from 'react';
import { CARD } from '../constants/ItemTypes';
import { DropTarget } from 'react-dnd';


const cardTarget = {
  drop(props, monitor) {
    if (props.id != monitor.getItem().idx) {
      props.update(monitor.getItem().id, props.id);
    }
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
    contents: PropTypes.object.isRequired,
  };

  render() {
    const { canDrop, isOver, connectDropTarget, contents, onClick, edit} = this.props;
    const isActive = canDrop && isOver;
    return connectDropTarget(
      <div className="card">
        <ul>
          {contents.map(c => 
            <li key={c.props.id} id={c.props.idx} onDrag={(e) => onClick(e)} onClick={(e) => onClick(e)}>
            {c}
          </li>
        )}
      </ul>
      </div>
    );
  }
};

