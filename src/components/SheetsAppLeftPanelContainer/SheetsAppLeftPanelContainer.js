import './SheetsAppLeftPanelContainer.css';
import SheetsAppLeftPanel from '../SheetsAppLeftPanel/SheetsAppLeftPanel.js';
import { connect } from 'react-redux';
import {
  changeMusicKey,
  changeMaxSoundsInOneSetAmount,
  toggleMusicKeyNamesVis,
  changeSwitchingNextSetMode,
  toggleClef,
  changeSheetsRange,
} from '../../actions/index';


const mapStateToProps = state => ({
  maxSoundsInSet: state.sheetsApp.maxSoundsInSet,
  showKeyNames: state.sheetsApp.showKeyNames,
  isNextSetAfterGuessAll: state.sheetsApp.isNextSetAfterGuessAll,
  sheetsToDraw: state.sheetsApp.sheetsToDraw,
  clef: state.sheetsApp.clefs[0],
});

const mapDispatchToProps = dispatch => ({
  onChangeMusicKey(musicKey) {
    dispatch(changeMusicKey(musicKey));
  },

  onChangeMaxSoundInSetAmount(diff) {
    dispatch(changeMaxSoundsInOneSetAmount(diff))
  },

  onToggleMusicKeyNamesVis() {
    dispatch(toggleMusicKeyNamesVis())
  },

  onChangeSwitchingNextSetMode() {
    dispatch(changeSwitchingNextSetMode())
  },

  onClefToggle(clef) {
    dispatch(toggleClef(clef))
  },

  onChangeSheetsRange(value) {
    dispatch(changeSheetsRange(value))
  },
})

const SheetsAppLeftPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SheetsAppLeftPanel);

export default SheetsAppLeftPanelContainer;
