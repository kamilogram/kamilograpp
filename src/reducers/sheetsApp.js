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

// const trebleTo = musicConsts.TREBLE_CLEF_TO;
// const bassTo = musicConsts.BASS_CLEF_TO;

const trebleFromMark = musicConsts.TREBLE_CLEF_FROM_MARK;
const bassFromMark = musicConsts.BASS_CLEF_FROM_MARK;

const trebleToMark = musicConsts.TREBLE_CLEF_TO_MARK;
const bassToMark = musicConsts.BASS_CLEF_TO_MARK;

const bothFromMark = musicConsts.BOTH_CLEFS_FROM_MARK;
const bothToMark = musicConsts.BOTH_CLEFS_TO_MARK;
/**
 * 
 * @param {object} state 
 * @param {string} mk musicKey
 * @param {number} mx maxSoundsInSet
 * @param {object} std sheetsToDraw {from: 'A3', to: 'E6'}
 * @returns array with (wylosowanymi) notes to render on staves
 * e.g. [["C5", "F#4"], ["D3"], ["G2", "D3"], ["G4"]]
 */
const drawSheetSets = (state, mk, mx, std) => {
  const musicKey = mk || state.musicKey;
  const maxSoundsInSet = mx || state.maxSoundsInSet;
  const sheetsToDraw = std || state.sheetsToDraw;
  const areBothClefs = state.clefs === 'both';
  return _.map(Array(state.sheetSets.length), soundsArray =>
    mh.drawSheetSet(musicKey, maxSoundsInSet, sheetsToDraw, areBothClefs)
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
  if(state.actualSheetSet >= state.sheetSets.length - 1) {
    //draw (random) new notes

    let newMusicKey = state.musicKey;
    if (state.randomizeKeys && _.random(1, 10) > 6) {
      newMusicKey = mh.getRandomKey()
    }

    return {
      ...state,
      actualSheetSet: 0,
      sheetSets: drawSheetSets(state, newMusicKey),
      currentTriesAmount: 0,
      musicKey: newMusicKey
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

// const toggleClefs = (clefToToggle) => {
  //TODO jak będą dwa klucze na raz to zmienić logikę
  // return clefToToggle;
// }

const sheetsApp = (state = {}, action) => {
  console.log('action.type: ', action.type);
  switch (action.type) {

    case 'CHANGE_MUSIC_KEY':
      return {
        ...state,
        musicKey: action.musicKey || state.musicKey,
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
      const actionFrom = action.from || state.actualScope.from;
      const actionTo = action.to || state.actualScope.to;
      let clefs = 'treble';
      if (actionFrom < trebleFromMark && actionTo <= bassToMark) {
        clefs = 'bass'
      } else if (actionFrom < trebleFromMark && actionTo > bassToMark) {
        clefs = 'both'
      }
      let clefFrom = clefs === 'treble' ? trebleFrom : bassFrom;
      let newFrom = mh.calcSoundNameFromScopeByNumber(bassFrom, actionFrom, LAST_SOUND);
      let newTo = mh.calcSoundNameFromScopeByNumber(bassFrom, actionTo, LAST_SOUND);
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
          from: actionFrom,
          to: actionTo,
        },
        clefs
      };

    case 'TOGGLE_CLEF':
      clefs = action.clef;
      clefFrom = clefs === 'bass' || clefs === 'both' ? bassFrom : trebleFrom;
      newFrom = mh.calcSoundNameFromScopeByNumber(clefFrom, bassFromMark, LAST_SOUND);
      newTo = mh.calcSoundNameFromScopeByNumber(clefFrom, clefs === 'both' ? trebleToMark : bassToMark, LAST_SOUND);
      newSheetsToDraw = {
        from: newFrom,
        to: newTo,
      };

      return {
        ...state,
        clefs,
        sheetSets: drawSheetSets(...[state, , , newSheetsToDraw]),
        actualSheetSet: 0,
        currentTriesAmount: 0,
        guessedSounds: [],
        badSounds: [],
        sheetsToDraw: newSheetsToDraw,
        actualScope: {
          from: clefs === 'treble' ? trebleFromMark : bothFromMark,
          to: clefs === 'bass' ? bassToMark : bothToMark,
        }
      };

    case 'CHANGE_RANDOMIZE_KEYS':
      let changedMusicKey = state.musicKey;
      if (state.randomizeKeys && _.random(1, 10) > 6) {
        changedMusicKey = mh.getRandomKey()
      }

      return {
        ...state,
        randomizeKeys: !state.randomizeKeys,
        musicKey: !state.randomizeKeys ? mh.getRandomKey() : state.musicKey,
        sheetSets: drawSheetSets(state, changedMusicKey),
      }

    default:
      return state;
  }
}

export default sheetsApp;
