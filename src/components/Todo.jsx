import React from 'react';
import colors from '../constants/colors'
import Calendar from './Calendar';
import IoCalendar from 'react-icons/lib/io/calendar';
import IoTrash from 'react-icons/lib/io/trash-a';
import IoClose from 'react-icons/lib/io/close-circled';
import IoCheckmark from 'react-icons/lib/io/checkmark-circled';
import TodoInput from './TodoInput';
import { tttf } from '../utils/TimeUtils'
import { setCD } from '../utils/GeneralUtils'

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
      time: '',
      dateSetter: false,
      tags: '',
      prio: '',
      users: '',
      sub: '',
      num: 0,
      done: 0,
    };
    this.onClick = this.onClick.bind(this);
    this.editOff = this.editOff.bind(this);
    this.editId = this.editId.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleDone = this.toggleDone.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAgenda = this.handleAgenda.bind(this);
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
      time: temp.get('time'),
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
      time: temp.get('time'),
      tags: temp.get('tags'),
      prio: temp.get('prio'),
      users: temp.get('users'),
      sub: temp.get('sub'),
      done: temp.get('done'),
      num: this.state.num+1,
      editView: true,
    });
    document.getElementById(id).focus();
  }

  editOff() {
    this.setState({ editView: false, dateSetter: false });
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
        done={value.get('done')}
        id={key}
        update={this.handleNameUpdate.bind(this)} 
        onClick={(e) => this.onClick(e)}
        name={value.get('name')}
        actions={this.props.actions}
      />);
    return todos;
  }

  edits() {
    const edits = this.props.editList.map((val, key) =>
      <textarea
        style={{textAlign: 'center'}}
        className={val.cname}
        key={key} 
        id={val.val}
        value={this.state[val.val]}
        placeholder={val.def}
        maxLength="20"
        onChange={(e) => this.onChange(e)}
        onKeyDown={(e) => this.onKeyDown(e)}
      />);
    return edits;
  }

  week() {
    const sorted = this.props.tasks.sort((a,b) => tttf(a.get('time')).localeCompare(tttf(b.get('time'))));
    const week = this.props.currentWeek.map((day, idx) =>
      <ul onClick={(e) => this.handleAgenda(e)} id={`${day}`} key={`day${idx}`}> {day}{'\n'}
        {sorted.filter(task => task.get('dueDate').split(' ')[0] == day).entrySeq().map(([key,val]) => 
          <li style={{color: setCD(val.get('done'), colors.color.blue).c, textDecoration: setCD(val.get('done')).d}}>
            {`${val.get('time')} ${val.get('name')}`}
          </li>
        )}
      </ul>
    );
    return week;
  }

  handleAgenda(e) {
    const day = e.target.id;
    this.setState({dueDate: day});
  }

  cards(day) {
    const sorted = this.props.tasks.sort((a,b) => tttf(a.get('time')).localeCompare(tttf(b.get('time')))).filter(task => task.get('dueDate') == day);
    const zero = sorted.filter(task => task.get('done') == 0).entrySeq().map(([key, val]) => 
      <li 
        style={{
        color: setCD(val.get('done'), colors.color.blue).c,
        textDecoration: setCD(val.get('done')).d,
        }}>
        {`${val.get('time')} ${val.get('name')}`}
        </li>) 
    const one = sorted.filter(task => task.get('done') == 1).entrySeq().map(([key, val]) => 
      <li 
        style={{
        color: setCD(val.get('done')).c,
        textDecoration: setCD(val.get('done')).d,
        }}>
        {`${val.get('time')} ${val.get('name')}`}
        </li>) 
    const two = sorted.filter(task => task.get('done') == 2).entrySeq().map(([key, val]) => 
      <li 
        style={{
        color: setCD(val.get('done')).c,
        textDecoration: setCD(val.get('done')).d,
        }}>
        {`${val.get('time')} ${val.get('name')}`}
        </li>) 
    return {
      d: day,
      z: zero,
      o: one,
      t: two,
    }
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.actions.deleteTask(this.state.id);
    this.setState({ editView: false, dateSetter: false });
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.actions.deleteTask(this.state.id);
    this.setState({ editView: false });
  }

  updateTime(d, t) {
    this.setState({dueDate: d, time: t})
  }

  editTime() {
    const time = {
      time: this.state.time,
      dueDate: this.state.dueDate
    }
    this.props.actions.editTodo(this.state.id, time);
    this.setState({ dateSetter: false });
  }

  toggleDone() {
    let d = 0;
    switch(this.state.done) {
      case 0:
        d = 1;
        break;
      case 1:
        d = 2;
        break;
      case 2:
        d = 0;
        break;
    }
    const done = {
      done: d
    }
    this.setState({done: d})
    this.props.actions.editTodo(this.state.id, done);
  }

  render() {
    const todos = this.todos();
    const edits = this.edits();
    const week = this.week();
    const cards = this.cards(this.state.dueDate);
    return (
      <div className="Grid Grid--flexCells">
        <div className="Grid-cell" id="nav-panel" style={{background: 'white', color: colors.color.darkgrey, fontSize: 16, flexDirection: 'column' }}>
          <div className="Aligner">
            <div className="Aligner-item Aligner-item--fixed">
              {week}
            </div>
          </div>
          {cards.d}
          <div className='card-container'>
            <div className ="card">
            <ul>
              {cards.z}
              </ul>
          </div>
          <div className ="card">
              <ul>
              {cards.o}
              </ul>
          </div>
          <div className ="card">
              <ul>
              {cards.t}
              </ul>
            </div>
          </div>
        </div>
        <div className="Grid-cell">
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
    <ReactCSSTransitionGroup
      transitionName="todo-trans"
      transitionEnterTimeout={200}
      transitionLeaveTimeout={200}
    >
      {todos}
    </ReactCSSTransitionGroup>
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
                    <IoClose size={22} onClick={this.editOff} onKeyPress={this.editOff} color={colors.color.darkgrey} />
                    <IoCheckmark size={22} onClick={this.toggleDone} color={colors.color.green}/>
                    <IoCalendar size={22} id="dateSetter" onClick={this.toggle} color={colors.color.blue}/>
                    <IoTrash size={22} onClick={this.handleDelete} color={colors.color.red}/>
                    <ReactCSSTransitionGroup
                      transitionName="calendar-trans"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={300}
                    >
                      {this.state.dateSetter ? <Calendar handleTimeEdit={this.editTime} update={this.updateTime} /> : null}
                    </ReactCSSTransitionGroup>
                    <textarea style={{fontSize: '14px', color: colors.color.blue, textAlign: 'center'}} readOnly value={`${this.state.dueDate} ${this.state.time}`}/>
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

