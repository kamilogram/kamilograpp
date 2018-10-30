const defaultStates = {
  menu: {
    'currentPage': 'Nuty gra',
  },
  sheetsApp: {
    musicKey: 'C',
    clefs: ['treble'],
    sheetSets: [['C4'], ['D4'], ['E4'], ['F4']],
    maxSoundsInSet: 1,
    actualSheetSet: 0,
    guessedSounds: [],
    badSounds: [],
    chromas: 'both',
    showKeyNames: true,
    isNextSetAfterGuessAll: true,
    currentTriesAmount: 0,
    sheetsToDraw: {
      from: 'A3',
      to: 'C6'
    },
  },
  sidePanels: {
    leftPanel: {
      open: false,
    },
    rightPanel: {
      open: false,
    },
  },
}

export default defaultStates;
