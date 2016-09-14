import React from 'react';
import colors from '../constants/colors'
import Calendar from './Calendar';
import IoCalendar from 'react-icons/lib/io/calendar';
import IoTrash from 'react-icons/lib/io/trash-a';
import IoClose from 'react-icons/lib/io/close-circled';
import IoCheckmark from 'react-icons/lib/io/checkmark-circled';
import GoCalendar from 'react-icons/lib/go/calendar';
import GoPlus from 'react-icons/lib/go/plus';
import TodoInput from './TodoInput';
import { tttf, outOfWeek } from '../utils/TimeUtils'
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
      inputing: false,
      name: '',
      input: '',
      id: '',
      dueDate: '',
      time: '',
      dateSetter: false,
      viewDate: true,
      tags: '',
      prio: '',
      users: '',
      sub: '',
      idx: 0,
      num: 0,
      done: 0,
    };
    this.onClick = this.onClick.bind(this);
    this.editOff = this.editOff.bind(this);
    this.kanbanToggle= this.kanbanToggle.bind(this);
    this.toggle = this.toggle.bind(this);
    this.newTodo = this.newTodo.bind(this);
    this.toggleDone = this.toggleDone.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAgenda = this.handleAgenda.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.editTime = this.editTime.bind(this);
  }

  componentDidUpdate() {
    if (this.props.tasks.size > this.state.num) {
      this.editID(this.props.tasks.size-1);
    }
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  }

  handleNameUpdate(value, id) {
    this.setState({ name: value });
    this.editID(id);
  }

  kanbanToggle() {
    this.setState({viewDate: !this.state.viewDate, dueDate: ''})
  }


  onKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (e.target.value) {
        const temp = {
          [e.target.id]: e.target.value.trim(),
          dueDate: this.state.dueDate,
          time: this.state.time,
        };
        this.setState({ [e.target.id]: e.target.value });
        if ([e.target.id] == 'input') {
          this.props.actions.addTask(temp, 'todo');
          this.setState({ inputing: false, input: '' });
        } else {
          this.props.actions.editTodo(this.state.id, temp);
        }
        if (this.state.editView == true && [e.target.id] != 'input') {
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
    console.log(temp.get('idx'))
    this.setState({
      id: temp.get('id'),
      name: temp.get('name'),
      dueDate: temp.get('dueDate'),
      time: temp.get('time'),
      tags: temp.get('tags'),
      prio: temp.get('prio'),
      users: temp.get('users'),
      idx: temp.get('idx'),
      sub: temp.get('sub'),
      done: temp.get('done'),
    });
    this.setState({ editView: true });
  }

  editID(id) {
    const temp = this.props.tasks.get(id);
    this.setState({
      id: temp.get('id'),
      name: temp.get('name'),
      dueDate: temp.get('dueDate'),
      time: temp.get('time'),
      tags: temp.get('tags'),
      prio: temp.get('prio'),
      idx: temp.get('idx'),
      users: temp.get('users'),
      sub: temp.get('sub'),
      done: temp.get('done'),
      num: this.state.num+1,
      editView: true,
    });
    document.getElementById(temp.get('idx')).focus();
  }

  editOff() {
    this.setState({
      name: '',
      dueDate: '',
      time: '',
      input: '',
      id: '',
      tags: '',
      idx: 0,
      done: 0,
      prio: '',
      users: '',
      sub: '',
    });
  }

  toggle(e) {
    this.setState({[e.target.id] : !this.state[e.target.id]})
  }

  todos() {
    const todos = this.props.tasks.filter(task => task.get('dueDate') == '').entrySeq().map(([key,val]) => 
      <p id={val.get('idx')} key={val.get('id')} onClick={(e) => this.onClick(e)} style={{color: setCD(val.get('done'), colors.color.blue).c, textDecoration: setCD(val.get('done')).d, padding: 0, margin: 0}}>
        {val.get('name')}
      </p>
    )
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
      <ul  id={`${day}`} key={`day${idx}`} style={{ color: colors.color.darkgrey, padding: 0, margin: 0}}> <li id={`${day}`} onClick={(e) => this.handleAgenda(e)} > {day} </li>{'\n'}
        {sorted.filter(task => task.get('dueDate').split(' ')[0] == day).entrySeq().map(([key,val]) => 
          <li>
            <p id={val.get('idx')} key={val.get('id')} onClick={(e) => this.onClick(e)} style={{color: setCD(val.get('done'), colors.color.blue).c, textDecoration: setCD(val.get('done')).d, padding: 0, margin: 0}}>
              {val.get('name')}
            </p>
          </li>)}
          {idx == this.props.currentWeek.length-1 ?
            <div>
              <h5 style={{padding: 0, margin: 0, color: colors.color.green, fontSize: 16}}>not in week</h5>
              {sorted.filter(task => this.props.currentWeek.includes(task.get('dueDate')) == false && task.get('dueDate') != '').entrySeq().map(([key,val])=> 
                <li>
                  <p id={val.get('idx')} key={val.get('id')} onClick={(e) => this.onClick(e)} style={{color: setCD(val.get('done'), colors.color.blue).c, textDecoration: setCD(val.get('done')).d, padding: 0, margin: 0}}>
                    {`${outOfWeek(val.get('dueDate'))} ${val.get('name')}`}
                  </p>
                </li>
              )}
            </div>
              : null
          }
        </ul>)
    return week;
  }

  newTodo() {
    this.setState({inputing: true});
    this.setState({
      name: '',
      input: '',
      id: '',
      tags: '',
      idx: 0,
      done: 0,
      prio: '',
      users: '',
      sub: '',
    });
  }

  handleAgenda(e) {
    const day = e.target.id;
    this.setState({dueDate: day, viewDate: true});
  }

  cards(day) {
    let sorted = []
    const sorted1 = this.props.tasks.sort((a,b) => tttf(a.get('time')).localeCompare(tttf(b.get('time')))).filter(task => task.get('dueDate') == day || this.props.currentWeek.includes(task.get('dueDate')) == false);
    const sorted2 = this.props.tasks.sort((a,b) => tttf(a.get('time')).localeCompare(tttf(b.get('time')))).filter(task => task.get('dueDate') == day)
    this.state.dueDate == '' ? sorted = sorted1 : sorted = sorted2
    const zero = sorted.filter(task => task.get('done') == 0).entrySeq().map(([key, val]) => 
      <li 
        id={val.get('idx')}
        onClick={(e) => this.onClick(e)}
        style={{
          color: setCD(val.get('done'), colors.color.blue).c,
            textDecoration: setCD(val.get('done')).d,
        }}>
        {`${outOfWeek(val.get('dueDate'))} ${val.get('time')} ${val.get('name')}`}
      </li>) 
    const one = sorted.filter(task => task.get('done') == 1).entrySeq().map(([key, val]) => 
      <li 
        id={val.get('idx')}
        onClick={(e) => this.onClick(e)}
        style={{
          color: setCD(val.get('done')).c,
            textDecoration: setCD(val.get('done')).d,
        }}>
        {`${outOfWeek(val.get('dueDate'))} ${val.get('time')} ${val.get('name')}`}
      </li>) 
    const two = sorted.filter(task => task.get('done') == 2).entrySeq().map(([key, val]) => 
      <li 
        id={val.get('idx')}
        onClick={(e) => this.onClick(e)}
        style={{
          color: setCD(val.get('done')).c,
            textDecoration: setCD(val.get('done')).d,
        }}>
        {`${outOfWeek(val.get('dueDate'))} ${val.get('time')} ${val.get('name')}`}
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

  kanbanOff() {
    this.setState({viewDate: false})
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
    const edits = this.edits();
    const todos = this.todos();
    const week = this.week();
    const cards = this.cards(this.state.dueDate);
    return (
      <div className="Grid Grid--flexCells">
        <div className="Grid-cell">
          <div className="Aligner" style={{width: "100%"}}>
            <div className="Aligner-item Aligner-item--fixed">
              {this.state.inputing ? 
                <textarea
                  autoFocus
                  className="todo-name-setter"
                  id="input"
                  maxLength={30}
                  ref={(c) => this._input = c}
                  value={this.state.input}
                  onChange={this.onChange}
                  onKeyDown={this.onKeyDown}
                  placeholder="add todo"
                  style={{color: colors.color.darkgrey, textAlign: "center"}}
                />
                  : <GoPlus size={30} color={colors.color.blue} onClick={this.newTodo}/>}
                </div>
              </div>
            </div>
            <div className="Grid-cell">
              <div className="Aligner" style={{width: "100%"}}>
                <div className="Aligner-item Aligner-item--fixed">
                  <ReactCSSTransitionGroup
                    transitionName="edit-trans"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                  >
                    {this.state.editView ?
                      <div style={{textAlign: 'center'}}>
                        <IoClose size={22} onClick={this.editOff} onKeyPress={this.editOff} color={colors.color.darkgrey} />
                        <IoCheckmark size={22} onClick={this.toggleDone} color={colors.color.green}/>
                        <IoCalendar size={22} id="dateSetter" onClick={this.toggle} color={colors.color.blue}/>
                        <IoTrash size={22} onClick={this.handleDelete} color={colors.color.red}/>
                        <ReactCSSTransitionGroup
                          transitionName="calendar-trans"
                          transitionEnterTimeout={500}
                          transitionLeaveTimeout={300}
                        >
                          <div className='cal' style={{textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
                            {this.state.dateSetter ? <Calendar handleTimeEdit={this.editTime} update={this.updateTime} /> : null}
                          </div>
                        </ReactCSSTransitionGroup>
                        <textarea style={{fontSize: 14, color: colors.color.blue, textAlign: 'center'}} readOnly value={`${this.state.dueDate} ${this.state.time}`}/>

                        <TodoInput
                          maxLength={30}
                          key={this.state.id}
                          k={this.state.id}
                          type={"todo"}
                          done={this.state.done}
                          id={this.state.idx}
                          update={this.handleNameUpdate.bind(this)} 
                          name={this.state.name}
                          actions={this.props.actions}
                        />
                        {edits}
                      </div>
                        : null}
                      </ReactCSSTransitionGroup>
                    </div>
                  </div>
                </div>
                <div className="Grid-cell" style={{background: 'white', color: colors.color.darkgrey, fontSize: 16, flexDirection: 'column' }}>
                  {this.state.viewDate ? <h2>{this.state.dueDate}</h2> : null}
                  <div className="Aligner" style={{width: "100%", height: '100%'}}>
                    <div className="Aligner-item Aligner-item--fixed">
                      <ReactCSSTransitionGroup
                        transitionName="todo-trans"
                        transitionEnterTimeout={200}
                        transitionLeaveTimeout={200}
                      >
                        {this.state.viewDate ?
                          <div className='card-container'>
                            <div className ="card">
                              <ul style={{padding: 0}}>
                                {cards.z}
                              </ul>
                            </div>
                            <div className ="card">
                              <ul style={{padding: 0}}>
                                {cards.o}
                              </ul>
                            </div>
                            <div className ="card">
                              <ul style={{padding: 0}}>
                                {cards.t}
                              </ul>
                            </div>
                          </div>
                            : 
                            <div className='week-container' style={{textAlign: 'center'}}>
                              {week}
                              <h5 style={{margin: 0, padding: 0, color: colors.color.red, fontSize: 16}}> unscheduled </h5>
                              {todos}
                            </div>

                        }
                        <div id='viewDate' style={{textAlign: 'center'}} onClick={this.kanbanToggle}>
                          <GoCalendar id='viewDate' onClick={this.toggle} size={22} color={colors.color.red}/>
                        </div>
                      </ReactCSSTransitionGroup>
                    </div>
                  </div>
                </div>
              </div>
    );
  }
}

