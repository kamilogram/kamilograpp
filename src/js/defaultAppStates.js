const defaultStates = {
  menu: {
    'currentPage': 'Nuty gra',
  },
  sheetsApp: {
    musicKey: 'C',
    clefs: 'treble',
    sheetSets: [['E4'], ['F4'], ['G4'], ["A4"]],
    maxSoundsInSet: 1,
    actualSheetSet: 0,
    guessedSounds: [],
    badSounds: [],
    chromas: 'both',
    randomizeKeys: false,
    showKeyNames: false,
    isNextSetAfterGuessAll: true,
    currentTriesAmount: 0,
    sheetsToDraw: {
      from: 'E4',
      to: 'F5'
    },
    actualScope: {
      from: 16,
      to: 24,
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
