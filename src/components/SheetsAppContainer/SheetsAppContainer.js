import SheetsApp from '../SheetsApp/SheetsApp.js';
import { connect } from 'react-redux';
import { clickSound, resetClickedSounds, togglePanelVisibility } from '../../actions/index';
import mh from '../../utils/musicHelpers.js';


const handlePianoKeyClick = (dispatch, pianoKey) => {
  dispatch(clickSound(pianoKey));

  setTimeout(() => {
    dispatch(resetClickedSounds());
  }, 1);
}

const mapStateToProps = state => ({
  sheetsAppState: state.sheetsApp,
  startPianoKey: mh.calcStartPianoKey(state.sheetsApp.sheetsToDraw.from),
  endPianoKey: mh.calcEndPianoKey(state.sheetsApp.sheetsToDraw.to),
  isTreble: state.sheetsApp.clefs === "treble" || state.sheetsApp.clefs === "both",
  isBass: state.sheetsApp.clefs === "bass" || state.sheetsApp.clefs === "both",
});

const mapDispatchToProps = dispatch => ({
  onPianoKeyClick(pianoKey) {
    handlePianoKeyClick(dispatch, pianoKey)
  },

  onClick() {
    dispatch(togglePanelVisibility('both', false))
  },
});

const SheetsAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SheetsApp);

export default SheetsAppContainer;
