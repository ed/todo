import React from 'react';
import colors from '../constants/colors'
import Calendar from './Calendar';
import { findDOMnode } from 'react-dom'
import IoCalendar from 'react-icons/lib/io/calendar';
import IoTrash from 'react-icons/lib/io/trash-a';
import IoClose from 'react-icons/lib/io/close-circled';
import IoAlert from 'react-icons/lib/io/alert';
import IoCheckmark from 'react-icons/lib/io/checkmark-circled';
import GoCalendar from 'react-icons/lib/go/calendar';
import GoTag from 'react-icons/lib/go/tag';
import GoPlus from 'react-icons/lib/go/plus';
import Cards from './Cards';
import TodoInput from './TodoInput';
import { tttf, outOfWeek, agenda, getDayName } from '../utils/TimeUtils'
import { setCD, createEdits, generateTagList } from '../utils/GeneralUtils'

const Immutable = require('immutable');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
const Infinite = require('react-infinite');

export default class Todo extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    tasks: React.PropTypes.instanceOf(Immutable.Map),
  }

  constructor(props) {
    super(props);
    this.state = {
      editView: false,
      editTag: false,
      inputting: false,
      name: '',
      input: '',
      id: '',
      ro: true,
      date: '',
      time: '',
      filter: '',
      filterval: '',
      dateSetter: false,
      viewDate: true,
      listWeek: false,
      tags: '',
      tagList: [],
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
    window.addEventListener("click", this.onClick, false);
    this.setState({tagList: generateTagList(this.props.tasks)})
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("click", this.onClick, false);
  }

  onChange(e) {
    e.preventDefault();
    if([e.target.id] == 'tags') {
      if (e.which === 32)
        return false;
    }
    this.setState({ [e.target.id]: e.target.value });
  }

  handleNameUpdate(value, id) {
    this.setState({ name: value });
    this.editID(id);
  }

  prioSelect() {
    let p = '';
    switch(this.state.prio) {
      case 'low':
        p = 'med';
        break;
      case 'med':
        p = 'high';
        break;
      case 'high':
        p = 'low';
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
          this.setState({ inputting: false, input: ''});
        } else {
          this.props.actions.editTodo(this.state.id, temp);
          if ([e.target.id] == 'tags') {
            const a = this.state.tagList;
            a.push(e.target.value.trim());
            this.setState({tagList: a});
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
    if (e.target.parentNode.className=="EditButton" || e.target.parentNode.tagName=="g") {

    }
    else if (e.target.id === '') {
      this.editOff()
    }
    else {
      if (this.state.id == e.target.id) {
        this.setState({ro: false});
      }
      else
        this.setState({ro: true});
      try {
        const temp = this.props.tasks.get(e.target.id);
        this.setState({
          id: temp.id,
          name: temp.name,
          time: temp.time,
          tags: temp.tags,
          prio: temp.prio,
          done: temp.done,
          editView: true,
          editTag: false,
          dateSetter: false,
        });
      }
      catch(err) {
      }
    }
  }

  editID(id) {
    const temp = this.props.tasks.get(id);
    this.setState({
      id: temp.id,
      name: temp.name,
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
      editView: false,
    });
  }

  toggle(e) {
    this.setState({[e.target.id] : !this.state[e.target.id]})
  }

  kanbanToggle() {
    this.setState({listWeek: false, viewDate: !this.state.viewDate, date: ''})
  }

  edits() {
    const edits = this.editList.map((val, key) =>
      <TodoInput
        className={val.cname}
        id={val.val}
        name={this.state[val.val]}
        placeholder={this.state[val.val] ? this.state[val.val] : val.def}
        maxLength="20"
      />);

    return edits;
  }

  listWeek() {
    const week = this.currentWeek.map((day, idx) =>
      <span>
        <ul id={`${day}`} style={{ 
          color: colors.color.peach, 
            padding: 0, 
            margin: 0
        }}>
        {`${getDayName(day)} ${day}`} 
        {this.props.tasks.filter(task => task.date === day).entrySeq().map(([key,obj]) => 
          <li id={obj.id} style={{color: colors.color.basegrey}} onClick={(e) => this.onClick(e)}>
          {`${obj.time} ${obj.name}`}
        </li>)}
      </ul>
    </span>
      )
    return week;
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
    this.setState({listWeek: false, date: day, viewDate: true, filter: ''});
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
    const listWeek = this.listWeek();
    return (
      <div className="Grid Grid--flexCells" >
              <ReactCSSTransitionGroup
                transitionName="edit-trans"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                {this.state.editView ?

              <div className="Aligner" style={{width: "100%", height: '100%'}}>
                <div className="Aligner-item Aligner-item--fixed" style={{background: colors.color.basewhite, borderRadius: '20px', padding: '10px', display: 'flex'}} >
          <div id="editMenu" className="Grid-cell Grid-cell u-10p" style={{fontSize: 16, flexDirection: 'row' }}>
            <div id="editButtons" className='edits' style={{display:'flex', justifyContent:'flex-start'}} >

              <div style={{background: colors.color.basewhite, textAlign: 'center'}}>
                <span id="buttons">
                  <p>{this.state.name}</p>
                    <button className="EditButton" id="close" onClick={this.editOff}>
                      <IoClose id="close" size={22} color={colors.color.basegrey} />
                    </button>
                    <button id="check" className="EditButton" onClick={this.toggleDone}>
                      <IoCheckmark id="checkmark" onClick={this.toggleDone} size={22} color={colors.color.green}/>
                    </button>
                    <button className="EditButton" id="dateSetter" onClick={this.toggle}>
                      <IoCalendar id="dateSetter" onClick={this.toggle} size={22} color={colors.color.blue}/>
                    </button>
                    <button className="EditButton" id="aT" onClick={this.prioSelect}>
                      <IoAlert id="aT" onClick={this.prioSelect} size={22} color={colors.color.orange}/>
                    </button>
                    <button className="EditButton" id="editTag" onClick={this.toggle}>
                      <GoTag id="editTag" onClick={this.toggle} size={22} color={colors.color.pink}/>
                    </button>
                    <button className="EditButton" id='trash' onClick={this.handleDelete}>
                      <IoTrash size={22} id='trash' onClick={this.handleDelete} color={colors.color.red}/>
                    </button>
                  </span>
                  <div style={{flexDirection: 'column', display: 'flex'}}>
                    <ReactCSSTransitionGroup
                      transitionName="calendar-trans"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={300}
                    >
                      <div className='cal' style={{textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
                        {this.state.dateSetter ? <Calendar handleTimeEdit={this.editTime} update={this.updateTime} /> : null}
                      </div>
                    </ReactCSSTransitionGroup>
                    {this.state.editTag ? edits : null}
                  </div>
                </div>
            </div>
            </div>
          </div>
          </div>
            : null}
              </ReactCSSTransitionGroup>
            <div className="Grid-cell" style={{color: colors.color.basegrey, fontSize: 16, flexDirection: 'column' }}>
              <div className="Aligner" style={{width: "100%", height: '100%'}}>
                <div className="Aligner-item Aligner-item--fixed" style={{background: colors.color.basewhite, borderRadius: '20px', padding: '10px'}} >
                    <div className='filters' style={{
                      display: 'flex', justifyContent: 'center',
                        background: '#FFBA77'
                    }}>
                  </div>
                  <select id='tags' onChange={this.filter} value='a'>
                    <option value="a" disabled> filter by tag </option>
                    <option value = 'none'>none</option>
                    {this.state.tagList.map(t => <option key={t} value = {t}>{t}</option>)}
                  </select>
                  <select id='prio' onChange={this.filter} value='a'>
                    <option disabled value='a'> filter by priority</option>
                    <option value = 'low'>low</option>
                    <option value = 'med'>med</option>
                    <option value = 'high'>high</option>
                  </select>
                  <button onClick={this.clearFilter} value="clear filters">
                    clear filters
                  </button>
                  <div className='card-container'>
                    <div className='week-container' style={{
                      cursor: 'pointer', display: 'flex', justifyContent: 'space-around', flexFlow: 'column wrap'}}>
                      <h5 id='listWeek' style={{margin: 0, padding: 0, 
                        color: this.state.listWeek ? colors.color.peach: colors.color.baselime, fontSize: 16}} onClick={(e) => this.toggle(e)}> current week </h5>
                      {week}
                      <h5 style={{margin: 0, padding: 0, 
                        color: this.state.date == '' ? colors.color.baseblue : colors.color.basegreen, fontSize: 16}} onClick={(e) => this.kanbanToggle(e)}> all tasks 
                        <span className="todo-count" style={{margin: '5px'}}>
                          {this.props.tasks.size}
                        </span>
                      </h5>
                    </div>
                  <ReactCSSTransitionGroup
                    transitionName="todo-trans"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                  >
                    {!this.state.listWeek ?
                    <Cards 
                      val={{val: this.state.filterval, filter: this.state.filter}} 
                      edit={this.handleDrag} 
                      date={this.state.date} 
                      updateName={this.handleNameUpdate.bind(this)} 
                      actions={this.props.actions}
                      onClick={this.onClick} 
                      ro={this.state.ro}
                      update={this.setDone}
                      chosen={this.state.id}
                    /> : 

                    <Infinite containerHeight={550} elementHeight={30} >
                        <div id='listWeek' className='listWeek' style={{display: 'flex', flexDirection: 'column', width: '500px', height: '500px', alignItems:'center', justifyContent: 'space-around'}}>     
                          { listWeek }
                        </div>
                      </Infinite>
                    }
                </ReactCSSTransitionGroup>
                  </div>
                <div>
                  {this.state.inputting ? 
                    <div style={{display:'flex', justifyContent:'center'}} >
                      <TodoInput
                        af={true}
                        id="input"
                        maxLength={30}
                        ref={(c) => this._input = c}
                        value={this.state.input}
                        placeholder="add todo"
                        update={this.handleNameUpdate.bind(this)} 
                        onKeyDown={this.onKeyDown}
                      />
                    </div>
                      : <GoPlus size={30} color={colors.color.basered} onClick={this.newTodo}/>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
    );
  }
}

