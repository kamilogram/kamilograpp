const sidePanels = (state = {}, action) => {
  switch (action.type) {
    case 'TOGGLE_PANEL_VISIBILITY':
      if (action.panel === 'leftPanel') {
        return {
          ...state,
          leftPanel: {
            ...state.leftPanel,
            open: action.show,
          },
        };}
      else if (action.panel === 'rightPanel')
        return {
          ...state,
          rightPanel: {
            ...state.rightPanel,
            open: action.show,
          },
        };
      //TODO skrócić
      else if (action.panel === 'both')
        return {
          ...state,
          rightPanel: {
            ...state.leftPanel,
            open: action.show,
          },
          leftPanel: {
            ...state.rightPanel,
            open: action.show,
          },
        };
      break;
    default:
      return state;
  }
}

export default sidePanels;
