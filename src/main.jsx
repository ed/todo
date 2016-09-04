import React from 'react';
import { render } from 'react-dom';
import 'css/style.css';
import App from 'containers/TaskContainer'
import TaskReducer from 'reducers/TaskReducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk';


const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
let store = createStoreWithMiddleware(TaskReducer);

render(
    <Provider store={store}>
        <App />
        </Provider>
    , document.getElementById('app'))
