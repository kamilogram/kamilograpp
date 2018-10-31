import defaultStates from '../js/defaultAppStates';
import _ from 'lodash';

export const loadState = () => {
  // try {
  //   const serializedState = localStorage.getItem('state');
  //   console.log("serializedState: ", serializedState);
  //   if(serializedState === null) {
  //     return defaultStates;
  //   }
  //   return _.merge(defaultStates, JSON.parse(serializedState));
  // } catch (err) {
  //   console.log("error load state: ", err);
  //   return defaultStates;
  // }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify({});
    // const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log("save state error: " + err);
  }
};
