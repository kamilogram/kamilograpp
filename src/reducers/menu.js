const sidePanels = (state = {}, action) => {
  switch (action.type) {
    case 'GO_TO_PAGE':
      return {
        ...state,
        currentPage: action.page,
      }
    default:
      return state;
  }
}

export default sidePanels;
