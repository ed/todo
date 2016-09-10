import React from 'react';

import TodoInput from './TodoInput';

const Immutable = require('immutable');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class Todo extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    tasks: React.PropTypes.instanceOf(Immutable.List),
    editList: React.PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      editView: false,
      inputTodo: '',
      name: '',
      id: '',
      dueDate: '',
      tags: '',
      time: '',
      prio: '',
      users: '',
      sub: '',
    };
    this.onClick = this.onClick.bind(this);
    this.editOff = this.editOff.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }


  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  }

  handleNameUpdate(value) {
    this.setState({ name: value });
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (e.target.value) {
        const temp = {
          [e.target.id]: e.target.value.trim(),
        };
        this.setState({ [e.target.id]: e.target.value });
        if ([e.target.id] == 'inputTodo') {
          this.props.actions.addTask(e.target.value, 'todo');
          this.setState({ inputTodo: '' });
        } else {
          this.props.actions.editTodo(this.state.id, temp);
        }
        if (this.state.editView == true) {
          const idx = this.props.editList.findIndex(ptr => ptr.val == [e.target.id]);
          if (idx + 1 == this.props.editList.length) {
            document.getElementById(this.props.editList[idx].val).focus();
          } else if (idx + 1 < this.props.editList.length) {
            document.getElementById(this.props.editList[idx + 1].val).focus();
          }
        }
        /* else if (String([e.target.id]).replace(/\d/g,'') == 'sub') { */
        /* 	}); */
        /* } */
      }
    }
  }


  onClick(e) {
    e.preventDefault();
    const temp = this.props.tasks.get(e.target.id);
    this.setState({
      id: temp.get('id'),
      name: temp.get('name'),
      dueDate: temp.get('dueDate'),
      tags: temp.get('tags'),
      prio: temp.get('prio'),
      users: temp.get('users'),
      sub: temp.get('sub'),
    });
    this.setState({ editView: true });
  }

  editOff() {
    this.setState({ editView: false });
  }


  todos() {
    const todos = this.props.tasks.entrySeq().map(([key, value]) =>
      <TodoInput
        key={value.get('id')}
        k={value.get('id')}
        type={"todo"}
        id={key}
        update={this.handleNameUpdate.bind(this)} 
        onClick={(e) => this.onClick(e)}
        name={value.get('name')}
        actions={this.props.actions}
      />);
    return todos;
  }

  edits() {
    const edits = this.props.editList.map((obj, key) =>
      <textarea
        className={obj.cname}
        key={key} id={obj.val}
        value={this.state[obj.val]}
        placeholder={obj.def}
        maxLength="20"
        onChange={(e) => this.onChange(e)}
        onKeyDown={(e) => this.onKeyDown(e)}
      />);
    return edits;
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.actions.deleteTask(this.state.id);
    this.setState({ editView: false });
  }

  render() {
    const todos = this.todos();
    const edits = this.edits();
    return (
      <div className="Grid Grid--flexCells">
        <div className="Grid-cell u-1of4" id="nav-panel">
          sidebar
        </div>
        <div className="Grid-cell" style={{ padding: '10px' }}>
          <div className="Grid-cell">
            <textarea
              className="todo-name-setter"
              id="inputTodo"
              maxLength={30}
              ref={(c) => this._input = c}
              value={this.state.inputTodo}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              placeholder="event name"
            />
            {todos}
          </div>
          <div className="Grid-cell">
            <ReactCSSTransitionGroup
              transitionName="edittrans"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
              {this.state.editView ?
                <div>
                <button onClick={this.editOff} value='close'/>
              <TodoEdit
                edits={edits}
                name={this.state.name}
              /> 
              </div>
              : null}
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}

const TodoEdit = (props) => <div><p>{props.name}</p>{props.edits}</div>;
TodoEdit.propTypes = {
  name: React.PropTypes.string,
  edits: React.PropTypes.array,
};
