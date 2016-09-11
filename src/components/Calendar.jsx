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
    };
    this.onClick = this.onClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
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
    const month = [...Array(7).fill([])];
    const keys = [...month.keys()];
    this.calendar = Immutable.fromJS(month);
    keys.map(
      day => currentMonth.reduce(
        (prev,elem) => day === elem.day() ? this.calendar = this.calendar.update(
          elem.day(), s => s.push(elem)) : ''));
  }

  renderTime() {
    this.time = createTimeInterval();
  }

  render() {
    return (
      <div>
        <ul>
          {this.calendar.map((value, idx) =>
            <li
              key={idx}
              style={{
                height: '30px',
                width: '30px',
                lineHeight: '30px',
                float: 'left',
                whiteSpace: 'pre-wrap',
                padding: '0px',
              }}
            >
              {moment().day(idx).format('dd')} {'\n'}
              {value.map(s =>
                <Day
                  key={`${idx}${value.indexOf(s)}`}
                  id={`${s.dayOfYear()}${s.format('YYYY')}`}
                  value={s.format('DD')}
                  onClick={(e) => this.onClick(e)}
                  chosen={`${s.dayOfYear()}${s.format('YYYY')}` === this.state.dateid}
                />
              )}
            </li>
          )}
        </ul>
        <div style={{ whiteSpace: 'pre-wrap' }}>
          <input value={`${this.state.formatted} ${this.state.time}`} />
          {'\n'}
          <select onChange={(e) => this.onSelect(e)} value={this.state.time}>
            {this.time.map(t => <option value={t}>{t}</option>)}
          </select>
        </div>
      </div>
    );
  }
}


const Day = (props) =>
  <span
    id={props.id}
    style={props.chosen ? { color: 'blue' } : { color: 'black' }}
    onClick={props.onClick}
  >
    {props.value}{'\n'}
  </span>;
Day.propTypes = {
  onClick: React.PropTypes.func,
  chosen: React.PropTypes.boolean,
  id: React.PropTypes.string,
  value: React.PropTypes.string,
};

