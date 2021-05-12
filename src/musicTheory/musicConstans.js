export default {
  //stave - pięciolinia
  //key - tonacja (klucz)
  //chroma - sharpy i flaty
  //clef - klucz (wiolinowy lub basowy)
  //pitch - jedna linia z pięciolinii
  //set - nuty w jednym dźwięku (od 1 do 3 lub więcej nut) na raz
  BASIC_SOUND_NAMES: ['C', 'D', 'E', 'F', 'G', 'A', 'B',],
  BASIC_SOUND_NAMES_H: ['C', 'D', 'E', 'F', 'G', 'A', 'H',],
  BASIC_SOUND_NAMES_PLUS_SHARPS:
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',],
  BASIC_SOUND_NAMES_PLUS_SHARPS_H:
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H',],
  BASIC_SOUND_NAMES_PLUS_FLATS:
    ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B',],
  BASIC_SOUND_NAMES_PLUS_FLATS_H:
    ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'B', 'H',],
  SHARPS: ['C#', 'D#', 'F#', 'G#', 'A#'],
  ALL_SOUNDS_NAMES: ['C', ['C#', 'Db'], 'D', ['D#', 'Eb'], 'E', 'F', ['F#', 'Gb'], 'G', ['G#', 'Ab'], 'A', ['A#', 'Bb'], 'B',],
  CHROMATIC_SIGNS_PITCHES: {
    'sharp': ['5', '3.5', '0.5u', '4', '2.5', '4.5'],
    'flat': ['3', '4.5', '2.5', '4', '2', '3.5'],
  },
  CHROMATIC_SOUNDS_ORDER: {
    'sharp': ['F', 'C', 'G', 'D', 'A', 'E'],
    'flat': ['B', 'E', 'A', 'D', 'G', 'C'],
  },
  MUSIC_KEYS_ORDER: [
    'C', 'G', 'D', 'A', 'E', 'B', /*'F#',*/ 'F', 'Bb', 'Eb', 'Ab', 'Db', /*'Gb'*/
  ],
  LAST_SOUND: 'C8',
  TREBLE_CLEF_FROM: 'A3',
  TREBLE_CLEF_TO: 'C6',
  BASS_CLEF_FROM: 'C2',
  BASS_CLEF_TO: 'E4',

  MUSIC_KEYS: {
    'C': 0,
    'D': 2,
    'E': 4,
    'F': -1,
    'G': 1,
    'A': 3,
    'B': 5,
    'C#': -5,
    'Db': -5,
    'D#': -3,
    'Eb': -3,
    'F#': 6,
    'Gb': -6,
    'G#': -4,
    'Ab': -4,
    'A#': -2,
    'Bb': -2,
  },

  TREBLE_CLEF_RANGE_MARKS: {
    0: 'A3',
    2: 'C4',
    4: 'E4',
    9: 'C5',
    12: 'F5',
    16: 'C6',
  },

  BASS_CLEF_RANGE_MARKS: {
    0: 'C2',
    2: 'E2',
    4: 'G2',
    9: 'E3',
    12: 'A3',
    16: 'E4',
  },

  BOTH_CLEFS_RANGE_MARKS: {
    0: 'C2',
    2: 'E2',
    4: 'G2',
    9: 'E3',
    12: 'A3',
    16: 'E4',
    21: 'C5',
    24: 'F5',
    28: 'C6',
  },

  NOTES_BETWEEN_STAVES: [
    'Ab3', 'A3', 'A#3', 'Bb3', 'B3', 'C4', 'C#4', 'Db4', 'D4', 'D#4', 'Eb4', 'E4',
  ],

  MUSIC_FONT_DIC: {
    trebleClef: {
      fontKey: '`',
    },
    bassClef: {
      fontKey: '~',
    },
    '4-4': {
      fontKey: 'k',
      sign: '4-4',
    },
    '6-8': {
      fontKey: 'l',
      sign: '6-8',
    },
    verticalLine: {
      fontKey: ',',
      sign: '|',
    },
    stave: {
      fontKey: 'M',
    },

    '2d': {
      fontKey: {
        quarter: 'a',
        sharp: 'Z',
        flat: 'z',
      },
      treble: 'A3',
      bass: 'C2',
    },
    '1.5d': {
      fontKey: {
        quarter: 's',
        sharp: 'X',
        flat: 'x',
      },
      treble: 'B3',
      bass: 'D2',
    },
    '1d': {
      fontKey: {
        quarter: '1',
        sharp: 'Q',
        flat: 'q',
      },
      treble: 'C4',
      bass: 'E2',
    },
    '0.5d': {
      fontKey: {
        quarter: '2',
        sharp: 'W',
        flat: 'w',
      },
      treble: 'D4',
      bass: 'F2',
    },
    '1': {
      fontKey: {
        quarter: '3',
        sharp: 'E',
        flat: 'e',
      },
      treble: 'E4',
      bass: 'G2',
    },
    '1.5': {
      fontKey: {
        quarter: '4',
        sharp: 'R',
        flat: 'r',
      },
      treble: 'F4',
      bass: 'A2',
    },
    '2': {
      fontKey: {
        quarter: '5',
        sharp: 'T',
        flat: 't',
      },
      treble: 'G4',
      bass: 'B2',
    },
    '2.5': {
      fontKey: {
        quarter: '6',
        sharp: 'Y',
        flat: 'y',
      },
      treble: 'A4',
      bass: 'C3',
    },
    '3': {
      fontKey: {
        quarter: '7',
        sharp: 'U',
        flat: 'u',
      },
      treble: 'B4',
      bass: 'D3',
    },
    '3.5': {
      fontKey: {
        quarter: '*',
        upsideDownQuarter: '8',
        sharp: 'I',
        flat: 'i',
      },
      treble: 'C5',
      bass: 'E3',
    },
    '4': {
      fontKey: {
        quarter: '(',
        upsideDownQuarter: '9',
        sharp: 'O',
        flat: 'o',
      },
      treble: 'D5',
      bass: 'F3',
    },
    '4.5': {
      fontKey: {
        quarter: ')',
        upsideDownQuarter: '0',
        sharp: 'P',
        flat: 'p',
      },
      treble: 'E5',
      bass: 'G3',
    },
    '5': {
      fontKey: {
        quarter: ':',
        upsideDownQuarter: '-',
        sharp: '{',
        flat: '[',
      },
      treble: 'F5',
      bass: 'A3',
    },
    '0.5u': {
      fontKey: {
        quarter: ';',
        upsideDownQuarter: '=',
        sharp: '}',
        flat: ']',
      },
      treble: 'G5',
      bass: 'B3',
    },
    '1u': {
      fontKey: {
        quarter: '/',
        upsideDownQuarter: 'd',
        sharp: 'C',
        flat: 'c',
      },
      treble: 'A5',
      bass: 'C4',
    },
    '1.5u': {
      fontKey: {
        quarter: '"',
        upsideDownQuarter: 'f',
        sharp: 'V',
        flat: 'v',
      },
      treble: 'B5',
      bass: 'D4',
    },
    '2u': {
      fontKey: {
        quarter: "'",
        upsideDownQuarter: 'g',
        sharp: 'B',
        flat: 'b',
      },
      treble: 'C6',
      bass: 'E4',
    },
  },


}
