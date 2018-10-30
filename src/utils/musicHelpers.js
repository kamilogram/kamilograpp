import _ from 'lodash';
import musicConsts from '../musicTheory/musicConstans.js';
import h from './helpers.js';
const musicDic = musicConsts.MUSIC_FONT_DIC;
const basicSoundNames = musicConsts.BASIC_SOUND_NAMES;
const allSoundsNames = musicConsts.ALL_SOUNDS_NAMES;
const musicKeys = musicConsts.MUSIC_KEYS;
const chromaticSoundsOrder = musicConsts.CHROMATIC_SOUNDS_ORDER;
const pitchConsts = musicConsts.CHROMATIC_SIGNS_PITCHES;

export default {

  //TODO opcja jak ktoś dodaje tablicę jako detail
  getSign(name, detail=false) {
    return detail
      ? _.get(musicDic, [name, 'fontKey', detail])
      : _.get(musicDic, [name, 'fontKey']);
  },

  getSignByPianoKeyName(pianoKeyName, clefType, sheetLength) {
    const pitch = _.findKey(musicDic, sheet => {
      return _.get(sheet, clefType) === this.deleteChromas(pianoKeyName);
    });
    return this.getSign(pitch, sheetLength);
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

  getStave(n=1) {
    return _.repeat(this.getSign('stave'), n)
  },

  getTrebleClef() {
    return [
      this.getSign('trebleClef'),
      this.getStave(),
    ]
  },

  deleteChromas(name) {
    const withoutSharp = _.replace(name, '#', '');
    return _.replace(withoutSharp, 'b', '');
  },

  isWithChromas(soundName, musicKey) {
    //(0 - 6)
    const musicKeyModValue = this.getAmountOfChromaticSounds(musicKey);

    //'sharp' or 'flat'
    const thisChromaLong = this.getMusicKeyChromaType(musicKey);

    //'#' or 'b'
    const thisChroma = this.getMusicKeyChromaType(musicKey, true);

    //or ['F', 'C', 'G', 'D', 'A', 'E'] when sharp or ['B', 'E', 'A', 'D', 'G', 'C'] when flat
    const soundsOrderByChromaType = _.get(chromaticSoundsOrder, [thisChromaLong]);

    //from [] through eg. ['F', 'C', 'G'] to ['F', 'C', 'G', 'D', 'A', 'E'] for sharp etc.
    const thisKeyChangedSounds = _.slice(soundsOrderByChromaType, 0, musicKeyModValue);

    if(!!_.findKey(thisKeyChangedSounds, a => a === _.nth(soundName, 0))) return null;

    if (_.findKey(soundName, l => l === thisChroma)) {
      return thisChromaLong;
    }
    else return null;
  },

  generateKeysArray(from, to, withBlack=false) {
    const fromSign = _.get(from, 0);
    const fromNumber = _.get(from, 1);
    const toSign = _.get(to, 0);
    const toNumber = _.get(to, 1);
    let outputTable = [];
    let stop = false;
    let start = false;
    const sounds = withBlack ? allSoundsNames : basicSoundNames;
    //TODO: przerobić na reduce
    for(let i=fromNumber; i<=toNumber; i++) {
      outputTable = _.concat(outputTable, _.reduce(sounds, (acc, sound) => {
        if (stop) return acc;
        if(fromNumber === _.toString(i) && sound === fromSign) start = true;
        if(toNumber === _.toString(i) && sound === toSign) stop = true;
        if(!start) return acc;

        if(_.isArray(sound))
          return _.concat(acc, [_.map(sound, chromaSound => chromaSound + i)]);
        else return _.concat(acc, sound + i);
      }, []))
    };
    return outputTable;
  },

  getSoundNameConsiderChromas(sound, chromas='both', slash=true) {
    if(this.isBlackPianoKey(sound)) {
      if(chromas === '#')
        return _.get(sound, [0]);
      else if(chromas === 'b')
        return _.get(sound, [1]);
      else
        return this.toNameBlackKey(sound, slash);
    }
    else return sound;
  },

  isBlackPianoKey(sound) {
    return _.isArray(sound)
  },

  toNameBlackKey(key, slash=true) {
    const interruption = slash ? ' / ' : ' '
    return _.nth(key, 0) + interruption + _.nth(key, 1);
  },

  isClickedKey(clickedKeys, pianoKey, clear=false) {
    if(clear) {
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
    if(this.isBlackPianoKey(pianoKeyName))
      return _.map(pianoKeyName, oneChromaKey =>
        _.truncate(oneChromaKey, {length: 2, 'omission': ''})
      );
    else return _.nth(pianoKeyName, 0);
  },

  isSoundInArray (sound, soundsArray, musicKey, clear=false) {
    const soundName = this.isBlackPianoKey(sound)
      ? this.getBlackSoundWithCurrentChroma(sound, musicKey)
      : sound;

    return !!_.findKey(soundsArray, soundFromArray => {
      if(this.isBlackPianoKey(soundFromArray))
        return _.isEqual(this.getBlackSoundWithCurrentChroma(soundFromArray, musicKey), soundName)
      else return _.isEqual(soundFromArray, soundName)
    })
  },

  // isSoundInArray(sound, soundsArray, musicKey, clear=false) {
  //   let soundName;
  //   if(this.isBlackPianoKey(sound)) {
  //
  //   } else {
  //     soundName = sound;
  //   }
  //   return !!_.findKey(soundsArray, soundFromArray => {
  //     return _.isEqual(soundFromArray, soundName);
  //   })
  // },


  getBlackSoundWithCurrentChroma(soundArray, musicKey) {
    const chromaType = this.getMusicKeyChromaType(musicKey, true);
    if(chromaType === '#' || chromaType === '') return _.nth(soundArray, 0);
    else if(chromaType === 'b') return _.nth(soundArray, 1);
  },

  //TODO tam gdzie takie same komentarze to stworzyć z tego jedną funkcję

  //returns strings: 'sharp', 'flat' or '#', 'b' by value
  //TODO użyć tej funkcji w sheets.js
  getChromaType(keyValue, short=false) {
    if(keyValue > 0) return short ? '#': 'sharp';
    else if(keyValue < 0) return short ? 'b': 'flat';
    else return '';
  },

  //returns moduled value of musicKey (from 0 to 6) by musicKey
  getAmountOfChromaticSounds(musicKey) {
    const musicKeyValue = this.getMusicKeyChromaValue(musicKey);
    if(musicKeyValue >= 0) return musicKeyValue;
    if(musicKeyValue < 0) return -musicKeyValue;
  },

  //returns simple value form -6 to 6
  getMusicKeyChromaValue(musicKey) {
    return _.get(musicKeys, [musicKey]);
  },

  //returns strings: 'sharp', 'flat' or '#', 'b' by musicKey
  getMusicKeyChromaType(musicKey, short=false) {
    return this.getChromaType(this.getMusicKeyChromaValue(musicKey), short);
  },

  drawSheetSet(musicKey, maxSoundsInSet, sheetsToDraw) {
    const currentSheetsAmount = _.random(1, maxSoundsInSet);
    const defaultSounds = this.generateKeysArray(sheetsToDraw.from, sheetsToDraw.to);
    const drawedValues = h.drawUniqueAndFarEnoughValues(currentSheetsAmount, 0, defaultSounds.length-1);
    return _.map(Array(currentSheetsAmount), (sound, index) => {
      return this.drawOneSound(
        musicKey,
        defaultSounds,
        _.get(drawedValues, [index])
      )
    });
  },

  drawOneSound(musicKey, defaultSounds, value) {
    const soundsInThisMusicKey = this.changeSoundsWithMusicKeyChromas(defaultSounds, musicKey);
    return _.get(soundsInThisMusicKey, value);
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

  insertChromaIntoSound(soundName, musicKey) {
    return _.nth(soundName, 0) + this.getMusicKeyChromaType(musicKey, true)  + _.nth(soundName, 1)
  },

  calcSoundNumberFromScopeByName(start, soundName, withBlack=false) {
    const soundsArray = this.generateKeysArray(start, soundName, withBlack);
    return _.indexOf(soundsArray, soundName);
  },

  calcSoundNameFromScopeByNumber(start, soundNumber, last, withBlack=false) {
    const soundsArray = this.generateKeysArray(start, last, withBlack);
    return soundsArray[soundNumber];
  },

  calcStartPianoKey(startSheet) {
    const mainName = startSheet[0];
    const number = startSheet[1];
    if(mainName < 'C') return 'F' + number;
    else if(mainName < 'F') return 'C' + number;
    else return 'F' + number;
  },

  calcEndPianoKey(endSheet) {
    const mainName = endSheet[0];
    const number = endSheet[1];
    if(mainName <= 'B') return 'B' + number;
    else if(mainName <= 'E') return 'E' + number;
    else return 'B' + number;
  }
}
