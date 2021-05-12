import React from 'react';
import './GhostPianoKey.css';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const GhostPianoKey = ({isGuessed, isBad}) => {
  return(
    <ReactCSSTransitionGroup
      className='ghostPianoKeyContainer'
      transitionName='animPianoKeyColorDisappear'
      transitionEnterTimeout={100}
      transitionLeaveTimeout={600}>
      {isGuessed && <div className='ghostPianoKey guess' />}
      {isBad && <div className='ghostPianoKey badGuess' />}
    </ReactCSSTransitionGroup>
  )
};

GhostPianoKey.propTypes = {
  isGuessed: PropTypes.bool.isRequired,
  isBad: PropTypes.bool.isRequired,
};

GhostPianoKey.defaultProps = {

};

export default GhostPianoKey
