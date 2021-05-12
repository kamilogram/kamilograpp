const defaultStates = {
  menu: {
    'currentPage': 'Nuty gra',
  },
  sheetsApp: {
    musicKey: 'B',
    clefs: 'both',
    sheetSets: [['C4'], ['D4'], ['E4'], ['F4']],
    maxSoundsInSet: 3,
    actualSheetSet: 0,
    guessedSounds: [],
    badSounds: [],
    chromas: 'both',
    showKeyNames: false,
    isNextSetAfterGuessAll: true,
    currentTriesAmount: 0,
    sheetsToDraw: {
      from: 'E3',
      to: 'A4'
    },
    actualScope: {
      from: 0,
      to: 16,
    }
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
