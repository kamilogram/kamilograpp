import React  from 'react';
import './PianoKey.css';
import classNames from 'classnames';
import mh from '../../utils/musicHelpers.js';
import PropTypes from 'prop-types';
import GhostPianoKey from '../GhostPianoKey/GhostPianoKey.js';


const PianoKey = props => {

  //TODO
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.showKeyNames !== this.props.showKeyNames
  // }


  //TODO coś zrobić z tą funkcją
  const keyName = mh.getSoundNameConsiderChromas(props.pianoKeyName, props.chromas, false);

  const keyColor = mh.isBlackPianoKey(props.pianoKeyName)
  ? 'BlackPianoKey'
  : 'WhitePianoKey';

  const classes=classNames(
    keyColor,
    'PianoKey',
  );

  return (
    <span
      className={classes}
      onClick={props.onClick}>

      <GhostPianoKey
        isGuessed={props.isGuessed}
        isBad={props.isBad} />

      {props.middleC && !props.showKeyNames && <div className='middleC'>o</div>}
      {props.showKeyNames && <div>{keyName}</div>}

    </span>
  )
};


PianoKey.propTypes = {
  chromas: PropTypes.string,
  showKeyNames: PropTypes.bool,

  isGuessed: PropTypes.bool.isRequired,
  isBad: PropTypes.bool.isRequired,
  pianoKeyName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
};

PianoKey.defaultProps = {
  chromas: 'both',
  showKeyNames: true,
};

export default PianoKey;
