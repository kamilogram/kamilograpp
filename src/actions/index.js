export const togglePanelVisibility = (panel, show) => ({
  type: 'TOGGLE_PANEL_VISIBILITY',
  panel,
  show,
});

export const clickSound = pianoKey => ({
  type: 'ADD_CHOSEN_SOUND',
  pianoKey,
});

export const resetClickedSounds = () => ({
  type: 'RESET_CLICKED_SOUNDS',
});

export const changeMusicKey = musicKey => ({
  type: 'CHANGE_MUSIC_KEY',
  musicKey,
});

export const changeMaxSoundsInOneSetAmount = diff => ({
  type: 'CHANGE_MAX_SOUNDS_IN_ONE_SET_AMOUNT',
  diff,
});

export const toggleMusicKeyNamesVis = () => ({
  type: 'TOGGLE_MUSIC_KEY_NAMES_VISIBILITY',
});

export const changeSwitchingNextSetMode = () => ({
  type: 'CHANGE_SWITCHING_TO_THE_NEXT_SET_MODE',
});

export const changeSheetsRange = value => ({
  type: 'CHANGE_SHEETS_RANGE',
  from: value[0],
  to: value[1],
});

export const goToPage = page => ({
  type: 'GO_TO_PAGE',
  page,
});

export const toggleClef = clef => ({
  type: 'TOGGLE_CLEF',
  clef,
});
