import React from 'react';
import colors from '../constants/colors'
import Calendar from './Calendar';
import IoCalendar from 'react-icons/lib/io/calendar';
import IoTrash from 'react-icons/lib/io/trash-a';
import IoClose from 'react-icons/lib/io/close-circled';
import IoAlert from 'react-icons/lib/io/alert';
import IoCheckmark from 'react-icons/lib/io/checkmark-circled';
import GoCalendar from 'react-icons/lib/go/calendar';
import GoPlus from 'react-icons/lib/go/plus';
import Cards from './Cards';
import Card from './Card';
import TodoInput from './TodoInput';
import { tttf, outOfWeek, agenda } from '../utils/TimeUtils'
import { setCD, createEdits } from '../utils/GeneralUtils'

const Immutable = require('immutable');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class Todo extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    tasks: React.PropTypes.instanceOf(Immutable.Map),
  }

  constructor(props) {
    super(props);
    this.state = {
      editView: false,
      inputting: false,
      name: '',
      input: '',
      id: '',
      dueDate: '',
      time: '',
      filter: '',
      filterval: '',
      dateSetter: false,
      viewDate: true,
      tags: '',
      tagArray: [],
      prio: '',
      users: '',
      sub: '',
      idx: 0,
      num: 0,
      done: 0,
    };
    this.editList = createEdits();
    this.currentWeek = agenda();
    this.onClick = this.onClick.bind(this);
    this.editOff = this.editOff.bind(this);
    this.toggle = this.toggle.bind(this);
    this.newTodo = this.newTodo.bind(this);
    this.toggleDone = this.toggleDone.bind(this);
    this.setDone = this.setDone.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAgenda = this.handleAgenda.bind(this);
    this.prioSelect = this.prioSelect.bind(this);
    this.filter = this.filter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  componentDidUpdate() {
    if (this.props.tasks.size > this.state.num) {
      this.editID(this.props.tasks.size-1);
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  }

  handleNameUpdate(value, id) {
    this.setState({ name: value });
    this.editID(id);
  }

  prioSelect() {
    let p = '';
    switch(this.state.prio) {
      case '':
        p = 'low';
        break;
      case 'low':
        p = 'med';
        break;
      case 'med':
        p = 'high';
        break;
      case 'high':
        p = '';
        break;
    }
    const temp = {
      prio: p
    }
    this.setState({prio: p})
    this.props.actions.editTodo(this.state.idx, temp);
  }


  onKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (this.state.inputting == false && (e.target.id == '' || e.target.id == 'input')) {
        this.setState({inputting: true});
      }
      else if (e.target.value && e.target.id) {
        const temp = {
          [e.target.id]: e.target.value.trim(),
          dueDate: this.state.dueDate,
          time: this.state.time,
        };
        this.setState({ [e.target.id]: e.target.value });
        if ([e.target.id] == 'input') {
          this.props.actions.addTask(temp, 'todo');
          this.setState({ inputting: false, input: '' });
        } else {
          this.props.actions.editTodo(this.state.idx, temp);
          if ([e.target.id] == 'tags') {
            const a = this.state.tagArray;
            a.push(e.target.value.trim());
            this.setState({tagArray: a});
          }
        }
        if (this.state.editView == true && [e.target.id] != 'input') {
          const idx = this.editList.findIndex(ptr => ptr.val == [e.target.id]);
          if (idx + 1 == this.editList.length) {
            document.getElementById(this.editList[idx].val).focus();
          } else if (idx + 1 < this.editList.length) {
            document.getElementById(this.editList[idx + 1].val).focus();
          }
        }
      }
    }
  }

  onClick(e) {
    e.preventDefault();
    const temp = this.props.tasks.get(parseInt(e.target.id));
    this.setState({
      id: temp.id,
      name: temp.name,
      dueDate: temp.dueDate,
      time: temp.time,
      tags: temp.tags,
      prio: temp.prio,
      idx: temp.idx,
      done: temp.done,
      editView: true,
    });
  }

  editID(id) {
    const temp = this.props.tasks.get(id);
    this.setState({
      id: temp.id,
      name: temp.name,
      dueDate: temp.dueDate,
      time: temp.time,
      tags: temp.tags,
      prio: temp.prio,
      idx: temp.idx,
      done: temp.done,
      num: this.state.num+1,
      editView: true,
    });
    document.getElementById(temp.idx).focus();
  }

  editOff() {
    this.setState({
      name: '',
      dueDate: '',
      time: '',
      input: '',
      id: '',
      filter: '',
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

  edits() {
    const edits = this.editList.map((val, key) =>
      <textarea
        style={{textAlign: 'center'}}
        className={val.cname}
        key={key} 
        id={val.val}
        value={this.state[val.val]}
        placeholder={val.def}
        maxLength="20"
        onChange={(e) => this.onChange(e)}
      />);

    return edits;
  }

  week() {
    const week = this.currentWeek.map((day, idx) =>
      <ul  id={`${day}`} key={`day${idx}`} 
        style={{ 
          color: day == this.state.dueDate ? colors.color.blue: colors.color.darkgrey, 
            padding: 0, 
            margin: 0
        }}>
        <li id={`${day}`}> 
          {`${day} `} 
          <span className='todo-count'>
          </span>
        </li>
      </ul>)
    return week;
  }

  newTodo() {
    this.setState({inputting: true});
    this.setState({
      name: '',
      input: '',
      id: '',
      tags: '',
      idx: 0,
      done: 0,
      prio: '',
      time: '',
      filter: '',
      users: '',
      sub: '',
    });
  }

  cards(state) {
    const { tasks } = this.props
    return this.props.tasks.filter(task => task.get('done') == state).entrySeq().map(([key, val]) => 
      <Card
        idx={val.get('idx')}
        id={val.get('id')}
        done={state}
        text={`${val.get('dueDate')} ${val.get('time')} ${val.get('name')}`}
      />
    ) 
  }

  handleAgenda(e) {
    const day = e.target.id;
    this.setState({dueDate: day, viewDate: true, filter: ''});
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.actions.deleteTask(this.state.id);
    this.setState({ editView: false, dateSetter: false });
  }

  updateTime(d, t) {
    this.setState({dueDate: d, time: t})
    const time = {
      time: t,
      dueDate: d
    }
    this.props.actions.editTodo(this.state.idx, time);
    this.setState({ time: '', dateSetter: false });
  }

  clearFilter(e) {
    e.preventDefault();
    this.setState({filter: '', filterval: ''})
  }

  filter(e) {
    e.preventDefault();
    this.setState({filterval: e.target.value, filter: e.target.id})
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
    this.setState({done: d})
    this.props.actions.setDone(this.state.idx, d);
  }

  setDone(id, d) {
    if(this.state.id === id) {
      this.setState({done: d})
      this.props.actions.setDone(this.state.idx, d);
    }
  }

  render() {
    const edits = this.edits();
    const week = this.week();
    return (
      <div className="Grid Grid--flexCells" >
        <div className="Grid-cell">
          <div className="Aligner" style={{width: "100%"}}>
            <div className="Aligner-item Aligner-item--fixed">
              {this.state.inputting ? 
                <textarea
                  autoFocus
                  className="todo-name-setter"
                  id="input"
                  maxLength={30}
                  ref={(c) => this._input = c}
                  value={this.state.input}
                  onChange={this.onChange}
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
                        <IoAlert size={22} onClick={this.prioSelect} color={colors.color.orange}/>
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
                        {this.state.prio}
                      </div>
                        : null}
                      </ReactCSSTransitionGroup>
                    </div>
                  </div>
                </div>
                <div className="Grid-cell" style={{background: 'white', color: colors.color.darkgrey, fontSize: 16, flexDirection: 'column' }}>
                  <div className="Aligner" style={{width: "100%", height: '100%'}}>
                    <div className="Aligner-item Aligner-item--fixed">
                      <ReactCSSTransitionGroup
                        transitionName="todo-trans"
                        transitionEnterTimeout={200}
                        transitionLeaveTimeout={200}
                      >
                        <div className='filters' style={{
                          display: 'flex', justifyContent: 'center'}}>
                          <select id='tags' onChange={this.filter} value='a'>
                            <option value="a" disabled> filter by tag </option>
                            {this.state.tagArray.map(t => <option key={t} value = {t}>{t}</option>)}
                          </select>
                          <select id='prio' onChange={this.filter} value='a'>
                            <option disabled value='a'> filter by priority</option>
                            <option value = 'low'>low</option>)
                            <option value = 'med'>med</option>)
                            <option value = 'high'>high</option>)
                          </select>
                          <button onClick={this.clearFilter} value="clear filters">
                            clear filters
                          </button>
                        </div>
                        <div className='card-container'>
                          <div className='week-container' style={{
                            display: 'flex', justifyContent: 'space-around', flexFlow: 'column wrap'}}>
                            {week}
                            <h5 style={{margin: 0, padding: 0, 
                              color: this.state.dueDate == '' ? colors.color.blue : colors.color.green, fontSize: 16}} onClick={(e) => this.kanbanToggle(e)}> not in week 
                              <span className="todo-count">
                              </span>
                            </h5>
                          </div>
                        <Cards onClick={this.onClick} update={this.setDone}/>
  </div>
</ReactCSSTransitionGroup>
                    </div>
                  </div>
                </div>
              </div>
    );
  }
}

