import React from 'react';
import { setCD } from '../utils/GeneralUtils'

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
        this.props.actions.editTodo(this.props.id, temp);
        this.setState({name: e.target.value.trim()});
      }
    }
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    const { k, id, name, onClick, done, ro} = this.props;
    const { c, d } = setCD(done);
    return (
      <textarea
        readOnly={ro}
        style={{
          textDecoration: d,
            color: c,
            textAlign: "center"}}
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
