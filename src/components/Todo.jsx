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
      date: '',
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
      num: 0,
      done: 0,
    };
    this.editList = createEdits();
    this.currentWeek = agenda();
    this.onClick = this.onClick.bind(this);
    this.editOff = this.editOff.bind(this);
    this.kanbanToggle= this.kanbanToggle.bind(this);
    this.toggle = this.toggle.bind(this);
    this.newTodo = this.newTodo.bind(this);
    this.toggleDone = this.toggleDone.bind(this);
    this.setDone = this.setDone.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleAgenda = this.handleAgenda.bind(this);
    this.prioSelect = this.prioSelect.bind(this);
    this.filter = this.filter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.updateTime = this.updateTime.bind(this);
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
    this.props.actions.editTodo(this.state.id, temp);
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
          date: this.state.date,
          time: this.state.time,
        };
        this.setState({ [e.target.id]: e.target.value });
        if ([e.target.id] == 'input') {
          this.props.actions.addTask(temp, 'todo');
          this.setState({ inputting: false, input: '', editView: true });
          this.editID(this.props.tasks.keyOf(this.props.tasks.last()))
        } else {
          this.props.actions.editTodo(this.state.id, temp);
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
    const temp = this.props.tasks.get(e.target.id);
    this.setState({
      id: temp.id,
      name: temp.name,
      time: temp.time,
      tags: temp.tags,
      prio: temp.prio,
      done: temp.done,
      editView: true,
    });
  }

  editID(id) {
    const temp = this.props.tasks.get(id);
    this.setState({
      id: temp.id,
      name: temp.name,
      date: temp.date,
      time: temp.time,
      tags: temp.tags,
      prio: temp.prio,
      done: temp.done,
      num: this.state.num+1,
      editView: true,
    });
  }

  editOff() {
    this.setState({
      name: '',
      date: '',
      time: '',
      input: '',
      id: '',
      filter: '',
      tags: '',
      done: 0,
      prio: '',
      users: '',
      sub: '',
    });
  }

  toggle(e) {
    this.setState({[e.target.id] : !this.state[e.target.id]})
  }

  kanbanToggle() {
    this.setState({viewDate: !this.state.viewDate, date: ''})
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
          color: day == this.state.date ? colors.color.baseblue: colors.color.basegrey, 
            padding: 0, 
            margin: 0
        }}>
        <li id={`${day}`} onClick={(e) => this.handleAgenda(e)}> 
          {`${day} `} 
          <span className='todo-count'>
            {this.props.tasks.filter(task => task.date === day).size}
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
      done: 0,
      prio: '',
      time: '',
      filter: '',
    });
  }


  handleAgenda(e) {
    const day = e.target.id;
    this.setState({date: day, viewDate: true, filter: ''});
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.actions.deleteTask(this.state.id);
    this.setState({ editView: false, dateSetter: false });
  }

  updateTime(d, t) {
    const time = {
      time: t,
      date: d
    }
    this.props.actions.editTodo(this.state.id, time);
    this.setState({dateSetter: false });
  }

  clearFilter(e) {
    e.preventDefault();
    this.setState({filter: '', filterval: ''})
  }

  filter(e) {
    e.preventDefault();
    let a = e.target.value
    let b = e.target.id
    if(e.target.value === 'none') {
      a = ''
    }
    this.setState({filterval: a, filter: b})
  }

  handleDrag(id) {
    this.editID(id);
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
    const o = { done: d }
    this.props.actions.editTodo(this.state.id, o);
  }

  setDone(id, d) {
    if(this.state.id === id) {
      this.setState({done: d})
      const o = { done: d }
      this.props.actions.editTodo(this.state.id, o);
    }
  }

  render() {
    const edits = this.edits();
    const week = this.week();
    return (
      <div className="Grid Grid--flexCells" >
        <div className="Grid-cell" style={{color: colors.color.basegrey, fontSize: 16, flexDirection: 'column' }}>
          <div className="Aligner" style={{width: "100%", height: '100%'}}>
            <div className="Aligner-item Aligner-item--fixed" style={{background: colors.color.basewhite, borderRadius: '20px', padding: '10px'}} >
              <div className='edits' style={{display:'flex', justifyContent:'center'}} >
                <ReactCSSTransitionGroup
                  transitionName="edit-trans"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}
                >
                  {this.state.editView ?
                    <div style={{background: colors.color.basewhite, textAlign: 'center'}}>
                      <IoClose size={22} onClick={this.editOff} onKeyPress={this.editOff} color={colors.color.basegrey} />
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
                      <div style={{flexDirection: 'column', display: 'flex'}}>
                        <textarea style={{fontSize: 14, color: colors.color.baseblue, textAlign: 'center'}} readOnly value={`${this.state.date} ${this.state.time}`}/>
                      <TodoInput
                        maxLength={30}
                        key={this.state.id}
                        k={this.state.id}
                        type={"todo"}
                        done={this.state.done}
                        id={this.state.id}
                        update={this.handleNameUpdate.bind(this)} 
                        name={this.state.name}
                        actions={this.props.actions}
                      />
                      {edits}
                    </div>
                      {this.state.prio}
                    </div>
                      : null}
                    </ReactCSSTransitionGroup>
                  </div>
                  <ReactCSSTransitionGroup
                    transitionName="todo-trans"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}
                  >
                    <div className='filters' style={{
                      display: 'flex', justifyContent: 'center',
                      background: '#FFBA77'
                    }}>
                      <select id='tags' onChange={this.filter} value='a'>
                        <option value="a" disabled> filter by tag </option>
                        <option value = 'none'>none</option>
                        {this.state.tagArray.map(t => <option key={t} value = {t}>{t}</option>)}
                      </select>
                      <select id='prio' onChange={this.filter} value='a'>
                        <option disabled value='a'> filter by priority</option>
                        <option value = 'none'>none</option>
                        <option value = 'low'>low</option>
                        <option value = 'med'>med</option>
                        <option value = 'high'>high</option>
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
                          color: this.state.date == '' ? colors.color.baseblue : colors.color.basegreen, fontSize: 16}} onClick={(e) => this.kanbanToggle(e)}> all tasks 
                          <span className="todo-count" style={{margin: '5px'}}>
                            {this.props.tasks.size}
                          </span>
                        </h5>
                      </div>
                      <Cards val={{val: this.state.filterval, filter: this.state.filter}} edit={this.handleDrag} date={this.state.date} onClick={this.onClick} update={this.setDone}/>
                    </div>
                  </ReactCSSTransitionGroup>
              <div>
                    {this.state.inputting ? 
              <div style={{display:'flex', justifyContent:'center'}} >
                      <textarea
                        autoFocus
                        className="todo-name-setter"
                        id="input"
                        maxLength={30}
                        ref={(c) => this._input = c}
                        value={this.state.input}
                        onChange={this.onChange}
                        placeholder="add todo"
                        style={{color: colors.color.basegrey, textAlign: "center"}}
                      />
                        </div>
                        : <GoPlus size={30} color={colors.color.baseblue} onClick={this.newTodo}/>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    );
  }
}

