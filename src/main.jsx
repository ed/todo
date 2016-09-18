import React from 'react';
import { render } from 'react-dom';
import 'css/styles.css';
import App from 'containers/App'
import TaskReducer from 'reducers/TaskReducers'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk';
import Immutable from 'immutable'
import { load, save } from './localStorage'


const persistedState = load();
const store = createStore( TaskReducer, persistedState );

store.subscribe(() => {
  save(store.getState())
});


render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app'))
