import './SheetsAppLeftPanelContainer.css';
import SheetsAppLeftPanel from '../SheetsAppLeftPanel/SheetsAppLeftPanel.js';
import { connect } from 'react-redux';
import {
  changeMusicKey,
  toggleAnimation,
  changeMaxSoundsInOneSetAmount,
  toggleMusicKeyNamesVis,
  changeSwitchingNextSetMode,
  toggleClef,
  changeSheetsRange,
  changeRandomizeKeys,
} from '../../actions/index';


const mapStateToProps = state => ({
  maxSoundsInSet: state.sheetsApp.maxSoundsInSet,
  showKeyNames: state.sheetsApp.showKeyNames,
  isNextSetAfterGuessAll: state.sheetsApp.isNextSetAfterGuessAll,
  sheetsToDraw: state.sheetsApp.sheetsToDraw,
  clef: state.sheetsApp.clefs,
  musicKey: state.sheetsApp.musicKey,
  actualScope: state.sheetsApp.actualScope,
  randomizeKeys: state.sheetsApp.randomizeKeys,
  animation: state.sheetsApp.animation,
  animationSpeed: state.sheetsApp.animationSpeed,
  darkMode: state.sheetsApp.darkMode,
});

const mapDispatchToProps = dispatch => ({
  onChangeMusicKey(musicKey) {
    dispatch(changeMusicKey(musicKey));
  },

  onToggleAnimation() {
    dispatch(toggleAnimation());
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

  onRandomizeKeys() {
    dispatch(changeRandomizeKeys())
  },

  onClefToggle(clef) {
    dispatch(toggleClef(clef))
    dispatch(changeSheetsRange())
  },

  onChangeSheetsRange(value) {
    dispatch(changeSheetsRange(value))
  },

  onChangeAnimationSpeed(speed) {
    dispatch({ type: 'CHANGE_ANIMATION_SPEED', speed });
  },

  onChangeViewMode() {
    dispatch({ type: 'CHANGE_VIEW_MODE' });
  },
})

const SheetsAppLeftPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SheetsAppLeftPanel);

export default SheetsAppLeftPanelContainer;
