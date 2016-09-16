import React, { Component } from 'react';
import TaskContainer from '../containers/TaskContainer';
import {Router, browserHistory} from 'react-router';

export default class App extends Component {
	render() {
		return (
      <TaskContainer />
		)
	}
}
