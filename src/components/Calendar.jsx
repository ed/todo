import React, { Component } from 'react';

import { createTimeInterval, getMonth } from '../utils/TimeUtils';

const moment = require('moment');
const Immutable = require('immutable');

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      formatted: '',
      dateid: '',
      time: '',
      month: moment().month(),
      year: moment().year(),
    };
    this.onClick = this.onClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.renderDates(moment());
    this.renderTime();
  }

  onClick(e) {
    e.preventDefault();
    const year = e.target.id.slice(-4);
    const day = e.target.id.slice(0, -4);
    this.setState({
      dateid: e.target.id,
      formatted: moment().set('year', year).dayOfYear(day).format('MM DD YY'),
      selected: moment().set('year', year).dayOfYear(day),
    });
  }

  onSelect(e) {
    e.preventDefault();
    this.setState({ time: e.target.value });
  }

  renderDates(date) {
    const currentMonth = getMonth(date);
    const month = [...Array(5).fill([])];
    const keys = [...month.keys()];
    this.calendar = Immutable.fromJS(month);
    keys.map(
      week => currentMonth.slice(week*7, (week+1)*7).map((day, idx) => 
        this.calendar = this.calendar.update(week, s => s.push(day))))
  }

  renderTime() {
    this.time = createTimeInterval();
  }

  nextMonth() {
    const next = moment().set('year', this.state.year).set('month', this.state.month).startOf('month').add(1, 'month')
    this.setState({month: next.month(), year: next.year()})
    this.renderDates(next);
  }

  prevMonth() {
    const prev = moment().set('year', this.state.year).set('month', this.state.month).startOf('month').add(-1, 'month')
    this.setState({month: prev.month(), year: prev.year()})
    this.renderDates(prev);
  }

  render() {
    return (
      <div>
        <span >
          <button onClick={this.prevMonth} value='<'>{'<'}</button>
          {`${moment().month(this.state.month).format('MMMM')}  ${this.state.year}`}
          <button onClick={this.nextMonth} value='>'>{'>'}</button>
        </span>
        <table>
          <tbody>
            <tr>
              {[...Array(7).keys()].map(s => 
                <td key={`h${s}`}>
                  {`${moment().day(s).format('dd')}`}
                </td>
              )}
            </tr>
            {this.calendar.map((value, idx) =>
              <tr key={idx}>
                {value.map(s => 
                  <Day 
                    value={s.date()}
                    id= {`${s.dayOfYear()}${s.year()}`}
                    k={`${s.dayOfYear()}${idx}`}
                    key={`${s.dayOfYear()}${idx}`}
                    chosen={ this.state.dateid === `${s.dayOfYear()}${s.year()}`}
                    onClick={this.onClick}
                  />
                )}
              </tr>
            )}
          </tbody>
        </table>
        <div style={{ whiteSpace: 'pre-wrap' }}>
          <input value={`${this.state.formatted} ${this.state.time}`} />
          {'\n'}
          <select onChange={(e) => this.onSelect(e)} value={this.state.time}>
            {this.time.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
    );
  }
}


const Day = (props) =>
  <td
    id={props.id}
    key={props.k}
    style={props.chosen ? { color : 'blue' } : { color : 'black' }}
    onClick={props.onClick}
  >
    {props.value}
  </td>;
Day.propTypes = {
  onClick: React.PropTypes.func,
  chosen: React.PropTypes.boolean,
  id: React.PropTypes.string,
  k: React.PropTypes.string,
  value: React.PropTypes.number,
};

