import { combineReducers } from 'redux';
import sheetsApp from './sheetsApp';
import sidePanels from './sidePanels';
import menu from './menu';

const reducers = combineReducers({
  sheetsApp,
  sidePanels,
  menu,
});

export default reducers;
