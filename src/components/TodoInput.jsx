import React from 'react';
import colors from '../constants/colors'

export default class TodoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (e.target.value) {
        const temp = {
          name: e.target.value.trim(),
        };
        this.props.actions.editTodo(this.props.k, temp);
        this.props.update(e.target.value.trim());
      }
    }
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    const { k, id, name, onClick, done } = this.props;
    return (
      <textarea
        style={ done ? { color : colors.color.blue } : {color: 'black'}, {textAlign: "center"} }
        key={k}
        id={id}
        onClick={onClick}
        onChange={this.handleChange}
        onKeyDown={(e) => this.onKeyDown(e)}
        value={this.state.name}
      />
    )
  }
}
