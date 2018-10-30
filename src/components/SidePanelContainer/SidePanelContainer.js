import './SidePanelContainer.css';
import SidePanel from '../SidePanel/SidePanel.js';
import { connect } from 'react-redux';
import { togglePanelVisibility } from '../../actions/index.js';

const mapStateToProps = state => ({
  open: state.sidePanels.leftPanel.open,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onButtonClick() {
    dispatch(togglePanelVisibility(ownProps.panel, true))
  },

  onCloseClick() {
    dispatch(togglePanelVisibility(ownProps.panel, false))
  },
});

const SidePanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidePanel);


export default SidePanelContainer;
