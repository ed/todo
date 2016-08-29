import React from 'react';
import { render } from 'react-dom';
import 'css/style.css';
import App from 'containers/TaskContainer'
import TaskReducer from 'reducers/TaskReducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

let store = createStore(TaskReducer);

render(
    <Provider store={store}>
        <App />
        </Provider>
    , document.getElementById('app'))
