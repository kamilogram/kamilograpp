import React from 'react';
import './PianoKeyboard.css';
import PianoKey from '../PianoKey/PianoKey.js';
import PropTypes from 'prop-types';
import mh from '../../utils/musicHelpers.js';


const PianoKeyboard = ({ from, to, appState, onPianoClick }) => {
  const soundNames = mh.generateKeysArray(from, to, true);

  return (
    <div className='PianoKeyboard'>
      {soundNames.map(pianoKeyName => {

        const isGuessed = mh.isSoundInArray(pianoKeyName, appState.guessedSounds, appState.musicKey);
        const isBad = mh.isSoundInArray(pianoKeyName, appState.badSounds, appState.musicKey);

        return (
          <PianoKey
            key={pianoKeyName}
            pianoKeyName={pianoKeyName}
            onClick={() => onPianoClick(pianoKeyName)}
            chromas={appState.chromas}
            showKeyNames={appState.showKeyNames}
            isGuessed={isGuessed}
            isBad={isBad}
            middleC={pianoKeyName==='C4'}
          />
        )}
      )}
    </div>
  )
}


PianoKeyboard.propTypes = {
  className: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string,
};


PianoKeyboard.defaultProps = {
  className: '',
  from: 'F3',
  to: 'E6',
};

export default PianoKeyboard;
