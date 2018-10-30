import h from '../utils/helpers.js';
import mh from '../utils/musicHelpers.js';
import _ from 'lodash';
import {
  MIN_SOUNDS_AMOUNT_IN_ONE_SET,
  MAX_SOUNDS_AMOUNT_IN_ONE_SET,
  TREBLE_CLEF_FROM,
} from '../js/appConstans.js';
import musicConsts from '../musicTheory/musicConstans';
const LAST_SOUND = musicConsts.LAST_SOUND;

const drawSheetSets = (state, mk, mx, std) => {
  const musicKey = mk || state.musicKey;
  const maxSoundsInSet = mx || state.maxSoundsInSet;
  const sheetsToDraw = std || state.sheetsToDraw;
  return _.map(Array(state.sheetSets.length), soundsArray =>
    mh.drawSheetSet(musicKey, maxSoundsInSet, sheetsToDraw)
  );
}

const countMaxSoundsInSetAmount = (diff, state) => {
  let newMaxSoundsInSetAmount = state.maxSoundsInSet + diff;
  if(newMaxSoundsInSetAmount < MIN_SOUNDS_AMOUNT_IN_ONE_SET)
    return MIN_SOUNDS_AMOUNT_IN_ONE_SET;
  else if(newMaxSoundsInSetAmount > MAX_SOUNDS_AMOUNT_IN_ONE_SET)
    return MAX_SOUNDS_AMOUNT_IN_ONE_SET;
  else return newMaxSoundsInSetAmount;
}

const checkIsSoundGuessed = (pianoKey, state) => {
  const actualSheetSet = _.get(state.sheetSets, [state.actualSheetSet]);
  return mh.isSoundInArray(pianoKey, actualSheetSet, state.musicKey);
}

const goToTheNextSet = state => {

  //render new sets, when it was the last set
  if(state.actualSheetSet >= state.sheetSets.length - 1){
    return {
      ...state,
      actualSheetSet: 0,
      sheetSets: drawSheetSets(state),
      currentTriesAmount: 0,
    }
  }

  //go to the next set of sheets, when there is any next
  else {
    return {
      ...state,
      actualSheetSet: ++state.actualSheetSet,
      currentTriesAmount: 0,
    }
  }
}

const checkToGoToTheNextSet = (isSoundGuessed, state) => {
  const sheetsInCurrentSetAmount = _.get(state.sheetSets, [state.actualSheetSet]).length;

  //'click until all is guessed':
  if(state.isNextSetAfterGuessAll) {
    let guessedSoundsAmount = state.guessedSounds.length;
    if(isSoundGuessed && (++guessedSoundsAmount) >= sheetsInCurrentSetAmount)
      return goToTheNextSet(state);
    else return state;
  }

  // 'tries amount equals sheets amount only':
  else {
    if(state.currentTriesAmount >= sheetsInCurrentSetAmount)
      return goToTheNextSet(state);
    else return state;
  }
}

const toggleClefs = (state, clefToToggle)=> {
  console.log("state.clefs: ", state.clefs);
  console.log("clefToToggle: ", clefToToggle);
  const currentClefs = state.clefs;
  if (_.find(state.clefs, clefToToggle))
    console.log("znalazłem");
}

const sheetsApp = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_MUSIC_KEY':
      return {
        ...state,
        musicKey: action.musicKey,
        sheetSets: drawSheetSets(state, action.musicKey),
        actualSheetSet: 0,
        currentTriesAmount: 0,
        guessedSounds: [],
        badSounds: [],
      };
    case 'RENDER_NEW_SHEET_SETS':

      return {
        ...state,
        sheetSets: drawSheetSets(state, action.musicKey),
        actualSheetSet: 0,
        currentTriesAmount: 0,
        guessedSounds: [],
        badSounds: [],
      };
    case 'CHANGE_MAX_SOUNDS_IN_ONE_SET_AMOUNT':
      const newMaxSoundsInSetAmount = countMaxSoundsInSetAmount(action.diff, state);
      console.log("action.diff: ", action.diff);
      if(newMaxSoundsInSetAmount !== state.maxSoundsInSet)
        return {
          ...state,
          maxSoundsInSet: newMaxSoundsInSetAmount,
          sheetSets: drawSheetSets(...[state, , newMaxSoundsInSetAmount]),
          actualSheetSet: 0,
          currentTriesAmount: 0,
          guessedSounds: [],
          badSounds: [],
        };
      else return state;
    // case 'GO_TO_THE_NEXT_SET':
    //   return {
    //     ...state,
    //     actualSheetSet: ++state.actualSheetSet,
    //     currentTriesAmount: 0,
    //   };
    case 'ADD_CHOSEN_SOUND':
      const isGuessed = checkIsSoundGuessed(action.pianoKey, state);
      let currentState = {
        ...state,
        currentTriesAmount: ++state.currentTriesAmount,
      }
      currentState = checkToGoToTheNextSet(isGuessed, state);
      if(isGuessed)
        return {
          ...currentState,
          guessedSounds: h.pushUniq(state.guessedSounds, [action.pianoKey]),
        };
      else return {
        ...currentState,
        badSounds: h.pushUniq(state.badSounds, [action.pianoKey]),
      };
    case 'RESET_CLICKED_SOUNDS':
      if(!state.currentTriesAmount)
        return {
          ...state,
          guessedSounds: [],
          badSounds: [],
        };
      else return state;
    case 'TOGGLE_MUSIC_KEY_NAMES_VISIBILITY':
      return {
        ...state,
        showKeyNames: !state.showKeyNames,
        guessedSounds: [],
        badSounds: [],
      };
    case 'CHANGE_SWITCHING_TO_THE_NEXT_SET_MODE':
      return {
        ...state,
        isNextSetAfterGuessAll: !state.isNextSetAfterGuessAll,
        sheetSets: drawSheetSets(state),
        actualSheetSet: 0,
        currentTriesAmount: 0,
        guessedSounds: [],
        badSounds: [],
      };
    case 'CHANGE_SHEETS_RANGE':
      const newFrom = mh.calcSoundNameFromScopeByNumber(TREBLE_CLEF_FROM, action.from, LAST_SOUND);
      const newTo = mh.calcSoundNameFromScopeByNumber(TREBLE_CLEF_FROM, action.to, LAST_SOUND);
      const newSheetsToDraw = {
        from: newFrom,
        to: newTo,
      };
      return {
        ...state,
        sheetSets: drawSheetSets(...[state, , , newSheetsToDraw]),
        actualSheetSet: 0,
        currentTriesAmount: 0,
        guessedSounds: [],
        badSounds: [],
        sheetsToDraw: newSheetsToDraw,
      };
    case 'TOGGLE_CLEF':
      return {
        ...state,
        clefs: toggleClefs(state, action.clef),
        sheetSets: drawSheetSets(state),
        actualSheetSet: 0,
        currentTriesAmount: 0,
        guessedSounds: [],
        badSounds: [],
      };

    default:
      return state;
  }
}

export default sheetsApp;
