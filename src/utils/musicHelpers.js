import _ from 'lodash';
import musicConsts from '../musicTheory/musicConstans.js';
import h from './helpers.js';
const musicDic = musicConsts.MUSIC_FONT_DIC;
const basicSoundNames = musicConsts.BASIC_SOUND_NAMES;
const allSoundsNames = musicConsts.ALL_SOUNDS_NAMES;
const musicKeys = musicConsts.MUSIC_KEYS;
const chromaticSoundsOrder = musicConsts.CHROMATIC_SOUNDS_ORDER;
const pitchConsts = musicConsts.CHROMATIC_SIGNS_PITCHES;
const notesBetweenStaves = musicConsts.NOTES_BETWEEN_STAVES;

export default {

  //TODO opcja jak ktoś dodaje tablicę jako detail

  /**
   * 
   * @param {string} name name of sign to render
   * @param {string } detail false | 'quarter' | 'sharp' | 'flat'
   * (sharp and flat are not used yet)
   * return string which is a music font of sign from TypeMyMusic or NewTypeMyMusic webfont, e.g. 'M' for stave
   */
  getSign(name, detail = false) {
    return detail
      ? _.get(musicDic, [name, 'fontKey', detail])
      : _.get(musicDic, [name, 'fontKey']);
  },

  /**
   * Returns a sign from webfont of music key
   * @param {string} pianoKeyName a note ('G5', 'A4', 'E#4', 'Db4', 'C4-down')
   * @param {*} clefType treble or bass
   * @param {*} sheetLength quarter | sharp | flat
   * (The sharp and flat sheetLength is not used yet, and will be when the single notes can have chromas);
   * @returns a note sign from the webfont (e.g. note from a two line under a stave, without any chroma in a treble clef has an 'a' sign in the music font)
   */
  getSignByPianoKeyName(pianoKeyName, clefType, sheetLength) {
    const cleanedNote = this.removeDuplicateWhenNoteIsBetweenStaves (pianoKeyName, clefType)
    const noteWithoutChromas = this.deleteChromas(cleanedNote);
      
    //pitch = '1.5', '4', '1d', '2u' - where this sound is in the stave
    const pitch = _.findKey(musicDic, sheet => {
      return _.get(sheet, clefType) === noteWithoutChromas;
    });
    return this.getSign(pitch, sheetLength);
  },

  removeDuplicateWhenNoteIsBetweenStaves (note, clef) {
    const fromTreble = note.indexOf("-up");
    const fromBass = note.indexOf("-down");
    if (
      (clef === 'treble' && fromBass > -1)
      || (clef === 'bass' && fromTreble > -1)
      ) {
        return null
      };
      
      let cleanedNote = note;
      if (fromTreble > -1) {
        cleanedNote = note.substring(0, fromTreble)
      } else if (fromBass > -1) {
        cleanedNote = note.substring(0, fromBass)
      }
      return cleanedNote;
  },

  getChromaSigns(keyType, i) {
    const pitches = _.get(pitchConsts, keyType);
    let iterator = 1;
    return _.map(pitches, pitch => {
      if (iterator > i) return;
      iterator++;
      return this.getSign(pitch, keyType);
    });
  },

  /**
   * Draws a stave signs
   * @param {number} n a length of stave
   * output: 'M' / 'MMMMMMMMMMMMMMMMM'
   * which is a stave sign in the webfont
   */
  getStave(n = 1) {
    return _.repeat(this.getSign('stave'), n)
  },

  // getTrebleClef() {
  //   return [
  //     this.getSign('trebleClef'),
  //     this.getStave(),
  //   ]
  // },

  /**
   * Deletes chromas (sharp and flat) a note
   * @param {string} name A4 | C5 | A#3 | Eb3 | ...
   * return a note without chromas e.g. A4 | C5 | A3 | E3
   */
  deleteChromas(name) {
    const withoutSharp = _.replace(name, '#', '');
    return _.replace(withoutSharp, 'b', '');
  },

  deleteUpAndDown(name) {
    if (_.isArray(name)) {
      return name.map(note => this.deleteUpAndDownFromSimpleNote(note))
    }

    return this.deleteUpAndDownFromSimpleNote(name);
  },

  deleteUpAndDownFromSimpleNote(note) {
    const withoutUpAdnDown = _.replace(note, '-up', '');
    return _.replace(withoutUpAdnDown, '-down', '');
  },

  /**
   * Czyżby zwracał # lub b dla pojedynczej nuty???
   * @param {string} soundName 'D4' / 'A3' ...
   * @param {string} musicKey 'C' / 'A' - music key
   * return 'sharp' | 'flat' | null
   */
  isWithChromas(soundName, musicKey) {

    //0 - 6 (sharps and flats value; both positive)
    const musicKeyModValue = this.getAmountOfChromaticSounds(musicKey);

    //'sharp' or 'flat'
    const thisChromaLong = this.getMusicKeyChromaType(musicKey);

    //'#' or 'b'
    const thisChromaShort = this.getMusicKeyChromaType(musicKey, true);

    //An array: ['F', 'C', 'G', 'D', 'A', 'E'] when sharp or ['B', 'E', 'A', 'D', 'G', 'C'] when flat or undefined when 'C'
    const soundsOrderByChromaType = _.get(chromaticSoundsOrder, [thisChromaLong]);

    //from [] through eg. ['F', 'C', 'G'] to ['F', 'C', 'G', 'D', 'A', 'E'] for sharp etc.
    const thisKeyChangedSounds = _.slice(soundsOrderByChromaType, 0, musicKeyModValue);

    //MAGIC
    if (!!_.findKey(thisKeyChangedSounds, a => a === _.nth(soundName, 0))) return null;

    if (_.findKey(soundName, a => a === thisChromaShort)) {
      return thisChromaLong;
    }
    else return null;
  },

  /**
   * Wylicza jakie dźwięki wchodzą w wyznaczony zakres
   * @param {string} from 'A3' | 'G5' | ...
   * @param {string} to  'A3' | 'G5' | ...
   * @param {boolean} withBlack 
   * @returns an array of sounds form 'from' note to 'to' note with or without notes with chroma e.g. [A3, B3, C4, ......, F5]
   */
  generateKeysArray(from, to, withBlack = false) {
    const fromSign = _.get(from, 0);
    const fromNumber = _.get(from, 1);
    const toSign = _.get(to, 0);
    const toNumber = _.get(to, 1);
    let outputTable = [];
    let stop = false;
    let start = false;
    const sounds = withBlack ? allSoundsNames : basicSoundNames;
    //TODO: przerobić na reduce
    for (let i = fromNumber; i <= toNumber; i++) {
      outputTable = _.concat(outputTable, _.reduce(sounds, (acc, sound) => {
        if (stop) return acc;
        if (fromNumber === _.toString(i) && sound === fromSign) start = true;
        if (toNumber === _.toString(i) && sound === toSign) stop = true;
        if (!start) return acc;

        if (_.isArray(sound))
          return _.concat(acc, [_.map(sound, chromaSound => chromaSound + i)]);
        else return _.concat(acc, sound + i);
      }, []))
    };
    return outputTable;
  },

  /**
   * Changes a note with chroma from an array into a string (with one or two variations of its name); a note without chroma returns as it is.
   * @param {string | array} sound 'C4' | ["A#5", "Bb5"] | ...
   * @param {string} chromas sharp | flat | both
   * @param {boolean} slash
   * return string with a name of the sound (depends of chroma version: sharp -> X#5; flat -> Yb5; both-> X#5 Yb5 | X#5/Yb5)
   */
  getSoundNameConsiderChromas(sound, chromas='both', slash = true) {
    if (this.isBlackPianoKey(sound)) {
      if (chromas === '#')
        return _.get(sound, [0]);
      else if (chromas === 'b')
        return _.get(sound, [1]);
      else
        return this.toNameBlackKey(sound, slash);
    }
    else return sound;
  },

  /**
   * Checks if a sound is from black key
   * @param {string | array} sound 'C4' | ["A#5", "Bb5"] | ...
   * return boolean (all the black notes have an array as the sound nomenclature, not simple string)
   */
  isBlackPianoKey(sound) {
    return _.isArray(sound)
  },

  /**
   * Changes an array with name variations of one black sound into a string.
   * @param {array} key sound of a black key ["A#5", "Bb5"] | ...
   * @param {boolean} slash 
   */
  toNameBlackKey(key, slash = true) {
    const interruption = slash ? ' / ' : ' ';
    return _.nth(key, 0) + interruption + _.nth(key, 1);
  },

  isClickedKey(clickedKeys, pianoKey, clear = false) {
    if (clear) {
      const clearedClickedKeys =
        _.map(clickedKeys, clickedKey => {
          return this.clearPianoKeyName(clickedKey);
        });

      return _.find(clearedClickedKeys, keyName =>
        _.isEqual(keyName, this.clearPianoKeyName(pianoKey))
      )
    } else {
      return _.find(clickedKeys, clickedKeyName =>
        _.isEqual(clickedKeyName, pianoKey) ||
        _.isEqual(clickedKeyName, this.clearPianoKeyName(pianoKey))
      )
    }
  },

  clearPianoKeyName(pianoKeyName) {
    if (this.isBlackPianoKey(pianoKeyName))
      return _.map(pianoKeyName, oneChromaKey =>
        _.truncate(oneChromaKey, { length: 2, 'omission': '' })
      );
    else return _.nth(pianoKeyName, 0);
  },

  /**
   * Checks is a particular sound is present in an array depending on an actual music key 
   * @param {string | array} sound 'C4' | ["A#5", "Bb5"] | ...
   * @param {array} soundsArray array of sounds (can be 2-dimentioned when there are sounds with chromas)
   * @param {string} musicKey music key 'c' | 'G' | ...
   * @param {boolean} clear  unused yet
   * return boolean
   */
  isSoundInArray(sound, soundsArray, musicKey, clear = false) {
    const soundName = this.isBlackPianoKey(sound)
    ? this.getBlackSoundWithCurrentChroma(sound, musicKey)
    : sound;

    return !!_.findKey(soundsArray, soundFromArray => {
      const clearSoundInArray = this.deleteUpAndDown(soundFromArray)
      if (this.isBlackPianoKey(clearSoundInArray))
        return _.isEqual(this.getBlackSoundWithCurrentChroma(clearSoundInArray, musicKey), soundName)
      else return _.isEqual(clearSoundInArray, soundName)
    })
  },

  getBlackSoundWithCurrentChroma(soundArray, musicKey) {
    const chromaType = this.getMusicKeyChromaType(musicKey, true);
    if (chromaType === '#' || chromaType === '') return _.nth(soundArray, 0);
    else if (chromaType === 'b') return _.nth(soundArray, 1);
  },

  //TODO użyć tej funkcji w sheets.js
  /**
   * Returns type of musicKey by chroma number (positive amount - sharp type, negative - flat type)
   * @param {number} keyValue 
   * @param {boolean} short
   * returns 'sharp', 'flat' or '#', 'b' by musicKey (or '' when musicKey is 'C')
   */
  getChromaType(keyValue, short = false) {
    if (keyValue > 0) return short ? '#' : 'sharp';
    else if (keyValue < 0) return short ? 'b' : 'flat';
    else return '';
  },

  /**
   * returns moduled value of musicKey (from 0 to 6) by musicKey (numbers of sharps or flats in the key) (C -> 0, G -> 1, Db -> 5)
   * @param {string} musicKey 'C', 'A', 'Db'
   * return 0/1/2/3/4/5/6 (only positive)
   */
  getAmountOfChromaticSounds(musicKey) {
    const musicKeyValue = this.getMusicKeyChromaValueFromLibrary(musicKey);
    if (musicKeyValue >= 0) return musicKeyValue;
    if (musicKeyValue < 0) return -musicKeyValue;
  },

  /**
   * returns numbers of sharps or flats in the key from -6 to 6 (sharps are positive, flats are negative)
   * @param {string} musicKey 'C', 'A', 'Db'
   * return oneOf -6, -5, ..., 0, 1, 2, ..., 6
   */
  getMusicKeyChromaValueFromLibrary(musicKey) {
    return _.get(musicKeys, [musicKey]);
  },

  /**
   * returns a type of musicKey (sharp type or flat type)
   * @param {string} musicKey 'C', 'G', 'Db', ...
   * @param {boolean} short long name or # / b
   * returns strings: 'sharp', 'flat' or '#', 'b' by musicKey (or '' when musicKey is 'C')
   */
  getMusicKeyChromaType(musicKey, short = false) {
    const musicKeyChromaValue = this.getMusicKeyChromaValueFromLibrary(musicKey);
    return this.getChromaType(musicKeyChromaValue, short);
  },

  /**
   * Losowanie nowych nut w jednym secie
   * @param {string} musicKey 
   * @param {number} maxSoundsInSet from 1 to 3 (3 may be changed
   * in a near future)
   * @param {object} sheetsToDraw {from: 'A3', to: 'E6'}
   * @param {boolean} areBothClefs
   * @returns array of (wylosowanych) notes in a one set eg.
   * ["F5"] | ["E4", "C4", "F5"]
   */
  drawSheetSet(musicKey, maxSoundsInSet, sheetsToDraw, areBothClefs) {
    const currentSheetsAmount = _.random(1, maxSoundsInSet);
    const defaultSounds = this.generateKeysArray(sheetsToDraw.from, sheetsToDraw.to);
    const drawedValues = h.drawUniqueAndFarEnoughValues(currentSheetsAmount, 0, defaultSounds.length - 1);
    return _.map(Array(currentSheetsAmount), (sound, index) => {
      console.log('DRAW ONE SOUND');
      return this.drawOneSound(
        musicKey,
        defaultSounds,
        _.get(drawedValues, [index]),
        areBothClefs,
      )
    });
  },

  /**
   * 
   * @param {string} musicKey 
   * @param {*} defaultSounds 
   * @param {*} value 
   * @param {boolean} areBothClefs 
   * @returns 
   */
  drawOneSound(musicKey, defaultSounds, value, areBothClefs) {
    const soundsInThisMusicKey = this.changeSoundsWithMusicKeyChromas(defaultSounds, musicKey);
    const output = _.get(soundsInThisMusicKey, value);
    return this.setNoteIntoOneStaveWhenBetweenTwoStaves(output, areBothClefs);
  },

  changeSoundsWithMusicKeyChromas(defaultSounds, musicKey) {
    //(0 - 6)
    const musicKeyModValue = this.getAmountOfChromaticSounds(musicKey);

    //or ['F', 'C', 'G', 'D', 'A', 'E'] when sharp or ['B', 'E', 'A', 'D', 'G', 'C'] when flat
    const soundsOrderByChromaType = _.get(chromaticSoundsOrder, [this.getMusicKeyChromaType(musicKey)]);

    //from [] through eg. ['F', 'C', 'G'] to ['F', 'C', 'G', 'D', 'A', 'E'] for sharp etc.
    const thisKeyChangedSounds = _.slice(soundsOrderByChromaType, 0, musicKeyModValue);

    return _.map(defaultSounds, sound => {
      const shouldSoundChange = !!_.findKey(thisKeyChangedSounds, a => a === _.nth(sound, 0));
      return shouldSoundChange
        ? this.insertChromaIntoSound(sound, musicKey)
        : sound;
    });
  },

  /**
   * Adds '-up' or '-down' (by random choice) to note if there are two staves and the note is between them.
   * @param {string} note 
   * @param {boolean} areBothClefs 
   * @returns 
   */
  setNoteIntoOneStaveWhenBetweenTwoStaves(note, areBothClefs) {
    if (!areBothClefs) {
      return note;
    }

    const isNoteBetweenStaves = notesBetweenStaves.some(noteBetween => noteBetween === note);
    if(!isNoteBetweenStaves) {
      return note;
    }

    const stave = _.random(1);
    return stave ? `${note}-up` : `${note}-down`
  },

  insertChromaIntoSound(soundName, musicKey) {
    return _.nth(soundName, 0) + this.getMusicKeyChromaType(musicKey, true) + _.nth(soundName, 1)
  },

  calcSoundNumberFromScopeByName(start, soundName, withBlack = false) {
    const soundsArray = this.generateKeysArray(start, soundName, withBlack);
    return _.indexOf(soundsArray, soundName);
  },

  calcSoundNameFromScopeByNumber(start, soundNumber, last, withBlack = false) {
    const soundsArray = this.generateKeysArray(start, last, withBlack);
    return soundsArray[soundNumber];
  },

  calcStartPianoKey(startSheet) {
    const mainName = startSheet[0];
    const number = startSheet[1];
    if (mainName < 'C') return 'F' + number;
    else if (mainName < 'F') return 'C' + number;
    else return 'F' + number;
  },

  calcEndPianoKey(endSheet) {
    const mainName = endSheet[0];
    const number = endSheet[1];
    if (mainName <= 'B') return 'B' + number;
    else if (mainName <= 'E') return 'E' + number;
    else return 'B' + number;
  }
}
