import React, { PropTypes } from 'react';
import colors from '../constants/colors';
import { DragSource } from 'react-dnd';
import { CARD } from '../constants/ItemTypes';
import { setCD } from '../utils/GeneralUtils'
import { prio } from '../utils/GeneralUtils'
import GoHeart from 'react-icons/lib/go/heart';
import TodoInput from './TodoInput'
  /**
   * Implements the drag source contract.
   */
const cardSource = {
  beginDrag(props) {
    console.log(props)
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
    const { isDragging, connectDragSource, ...props} = this.props;
    const { c, d } = setCD(props.done);
    const b = props.chosen === props.id ? colors.color.lightgrey : colors.color.basewhite
    console.log(props.ro,props.chosen,b)
    return connectDragSource(
      <div id='card-line' className='InputAddOn' style={{ cursor: '-webkit-grab', display: 'flex', background: b, textDecoration: d, color: c, opacity: isDragging ? 0.5 : 1 , height: 30}}>
        <span className="InputAddOn-item">
          <GoHeart size={22} color={prio(props.prio)} /> 
        </span>
        <TodoInput
          className='InputAddOn-field'
          ro={(props.ro && props.chosen === props.id) ? props.ro : false}
          us='on'
          type={"todo"}
          id={props.id}
          done={props.done}
          update={props.updateName} 
          onClick={(e) => props.onClick(e)}
          name={props.name}
          actions={props.actions}
        />
        <span className="InputAddOn-item">
          {props.text}
        </span>
      </div>,
  { dropEffect: 'move' }
    );
  }
}
