import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { CARD } from '../constants/ItemTypes';
import { setCD } from '../utils/GeneralUtils'
  /**
   * Implements the drag source contract.
   */
const cardSource = {
  beginDrag(props) {
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
    const { isDragging, connectDragSource, done, text, idx } = this.props;
    const { c, d } = setCD(done);
    return connectDragSource(
      <div id={idx} style={{ textDecoration: d, color: c, opacity: isDragging ? 0.5 : 1 }}>
          {text}
      </div>
    );
  }
}
