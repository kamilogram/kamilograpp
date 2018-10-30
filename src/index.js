import React from 'react';
// import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import App from './App';
import './index.css';
import { createStore } from 'redux';
import reducers from './reducers/index';
import { Provider } from 'react-redux';
import { loadState, saveState } from './utils/localStorage';
import throttle from 'lodash/throttle';

const store = createStore(reducers, loadState());

store.subscribe(throttle(() => {
  saveState(store.getState())
}, 1000));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
