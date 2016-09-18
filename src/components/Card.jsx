import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { CARD } from '../constants/ItemTypes';
import { setCD } from '../utils/GeneralUtils'
import { prio } from '../utils/GeneralUtils'
import GoHeart from 'react-icons/lib/go/heart';
  /**
   * Implements the drag source contract.
   */
const cardSource = {
  beginDrag(props) {
    props.update(props.id);
    return {
      id: props.id,
      done: props.done
    };
  },

  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  }
};

@DragSource(CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Card extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,

    // Injected by React DnD:
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  render() {
    const { isDragging, connectDragSource, done, text, id } = this.props;
    const { c, d } = setCD(done);
    return connectDragSource(
      <div id={id} style={{ textDecoration: d, color: c, opacity: isDragging ? 0.5 : 1 }}>
        <GoHeart size={22} color={prio(this.props.prio)} /> {text}
      </div>
    );
  }
}
