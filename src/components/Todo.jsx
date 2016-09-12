import React from 'react';
import colors from '../constants/colors'
import Calendar from './Calendar';
import IoCalendar from 'react-icons/lib/io/calendar';
import IoTrash from 'react-icons/lib/io/trash-a';
import IoClose from 'react-icons/lib/io/close-circled';
import IoCheckmark from 'react-icons/lib/io/checkmark-circled';
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
      dateSetter: false,
      tags: '',
      prio: '',
      users: '',
      sub: '',
      num: 0,
      done: false,
    };
    this.onClick = this.onClick.bind(this);
    this.editOff = this.editOff.bind(this);
    this.editId = this.editId.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleDone = this.toggleDone.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.editTime = this.editTime.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  }

  handleNameUpdate(value) {
    this.setState({ name: value });
  }

  componentDidUpdate() {
    if (this.props.tasks.size > this.state.num) {
      this.editId(this.props.tasks.size-1);
      this.setState({ num: this.state.num+1 });
    }
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
        if (this.state.editView == true && [e.target.id] != 'inputTodo') {
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
      done: temp.get('done'),
    });
    this.setState({ editView: true });
  }


  editId(id) {
    const temp = this.props.tasks.get(id);
    this.setState({
      id: temp.get('id'),
      name: temp.get('name'),
      dueDate: temp.get('dueDate'),
      tags: temp.get('tags'),
      prio: temp.get('prio'),
      users: temp.get('users'),
      sub: temp.get('sub'),
      done: temp.get('done'),
    });
    this.setState({ editView: true });
    document.getElementById(id).focus();
  }

  editOff() {
    this.setState({ editView: false });
  }

  toggle(e) {
    this.setState({[e.target.id] : !this.state[e.target.id]})
  }

  todos() {
    const todos = this.props.tasks.entrySeq().map(([key, value]) =>
      <TodoInput
        key={value.get('id')}
        k={value.get('id')}
        type={"todo"}
        done={this.state.done}
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
        style={{textAlign: 'center'}}
        className={obj.cname}
        key={key} 
        id={obj.val}
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

  updateTime(d, t) {
    this.setState({dueDate: `${d} ${t}`})
  }

  editTime() {
    const time = {
      dueDate: this.state.dueDate
    }
    this.props.actions.editTodo(this.state.id, time);
    this.setState({ dateSetter: false });
  }

  toggleDone() {
    const done = {
      done: !this.state.done
    }
    this.setState({done: !this.state.done})
    this.props.actions.editTodo(this.state.id, done);
  }

  render() {
    const todos = this.todos();
    const edits = this.edits();
    return (
      <div className="Grid Grid--flexCells">
        <div className="Grid-cell u-1of4" id="nav-panel" style={{background: 'white' }}>
        </div>
        <div className="Grid-cell u-1of2">
          <div className="Aligner" style={{width: "100%"}}>
            <div className="Aligner-item Aligner-item--fixed">
              <textarea
                autoFocus
                className="todo-name-setter"
                id="inputTodo"
                maxLength={30}
                ref={(c) => this._input = c}
                value={this.state.inputTodo}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
                placeholder="add todo"
                style={{color: colors.color.darkgrey, textAlign: "center"}}
              />
              {todos}
            </div>
          </div>
        </div>
        <div className="Grid-cell u-1of4">
          <div className="Aligner" style={{width: "100%"}}>
            <div className="Aligner-item Aligner-item--fixed">
              <ReactCSSTransitionGroup
                transitionName="edit-trans"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                {this.state.editView ?
                  <div style={{textAlign: 'center'}}>
                    <strong><p style={{textAlign: 'center', color: colors.color.darkgrey}}>{this.state.name}</p></strong>
                    <span style={{padding:'5px' ,margin:'5px'}}>
                    <IoClose size={22} onClick={this.editOff} onKeyPress={this.editOff} color={colors.color.darkgrey} />
                    <IoCheckmark size={22} onClick={this.toggleDone} color={colors.color.green}/>
                    <IoCalendar size={22} id="dateSetter" onClick={this.toggle} color={colors.color.blue}/>
                    <IoTrash size={22} onClick={this.handleDelete} color={colors.color.red}/>
                  </span>
                    {'\n'}
                    <ReactCSSTransitionGroup
                      transitionName="calendar-trans"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={300}
                    >
                      {this.state.dateSetter ? <Calendar handleTimeEdit={this.editTime} update={this.updateTime} /> : null}
                    </ReactCSSTransitionGroup>
                    <textarea style={{fontSize: '14px', color: colors.color.blue, textAlign: 'center'}} readOnly value={this.state.dueDate}/>
                    {edits}
                  </div>
                    : null}
                  </ReactCSSTransitionGroup>
                </div>
              </div>
            </div>
          </div>
    );
  }
}

