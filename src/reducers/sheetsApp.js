import h from '../utils/helpers.js';
import mh from '../utils/musicHelpers.js';
import _ from 'lodash';
import {
  MIN_SOUNDS_AMOUNT_IN_ONE_SET,
  MAX_SOUNDS_AMOUNT_IN_ONE_SET,
} from '../js/appConstans.js';
import musicConsts from '../musicTheory/musicConstans';
const LAST_SOUND = musicConsts.LAST_SOUND;
const trebleFrom = musicConsts.TREBLE_CLEF_FROM;
const bassFrom = musicConsts.BASS_CLEF_FROM;

const drawSheetSets = (state, mk, mx, std) => {
  const musicKey = mk || state.musicKey;
  const maxSoundsInSet = mx || state.maxSoundsInSet;
  const sheetsToDraw = std || state.sheetsToDraw;
  const aaa = _.map(Array(state.sheetSets.length), soundsArray =>
    mh.drawSheetSet(musicKey, maxSoundsInSet, sheetsToDraw)
  );
  console.log('aaa: ', aaa);
  return aaa
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

const toggleClefs = (clefs, clefToToggle)=> {
  //TODO jak będą dwa klucze na raz to zmienić logikę
  return [clefToToggle];
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
      let clef = state.clefs[0];
      let clefFrom = clef === 'treble' ? trebleFrom : bassFrom;
      let newFrom = mh.calcSoundNameFromScopeByNumber(clefFrom, action.from, LAST_SOUND);
      let newTo = mh.calcSoundNameFromScopeByNumber(clefFrom, action.to, LAST_SOUND);
      let newSheetsToDraw = {
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
        actualScope: {
          from: action.from,
          to: action.to,
        }
      };
    case 'TOGGLE_CLEF':
      clef = action.clef;
      clefFrom = clef === 'treble' ? trebleFrom : bassFrom;
      newFrom = mh.calcSoundNameFromScopeByNumber(clefFrom, state.actualScope.from, LAST_SOUND);
      newTo = mh.calcSoundNameFromScopeByNumber(clefFrom, state.actualScope.to, LAST_SOUND);
      newSheetsToDraw = {
        from: newFrom,
        to: newTo,
      };
      return {
        ...state,
        clefs: toggleClefs(state.clefs, action.clef),
        sheetSets: drawSheetSets(...[state, , , newSheetsToDraw]),
        actualSheetSet: 0,
        currentTriesAmount: 0,
        guessedSounds: [],
        badSounds: [],
        sheetsToDraw: newSheetsToDraw,
      };

    default:
      return state;
  }
}

export default sheetsApp;
