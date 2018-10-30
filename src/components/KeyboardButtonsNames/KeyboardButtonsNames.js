import React from 'react';
import classNames from 'classnames';
import './KeyboardButtonsNames.css';
import _ from 'lodash';
// import PropTypes from 'prop-types';
import mh from '../../utils/musicHelpers.js';
import Button from '../Button/Button.js';
import musicConstans from '../../musicTheory/musicConstans.js';
const ALL_SOUNDS_NAMES = musicConstans.ALL_SOUNDS_NAMES;

const KeyboardButtonsNames = ({className, ...rest}) => {

  const renderButton = (sound, {chromas, onClick}) => {
    const soundName = mh.getSoundNameConsiderChromas(sound, chromas);

    const classes = classNames(
      'KeyNameButton',
      {
        //TODO będzie guessed lub bad
        // clicked: mh.isClickedKey(clickedKeys, sound, true)
      }
    );

    return (
      <Button
        className={classes}
        name={soundName}
        key={'keyNameButton' + soundName}
        // onClick={onClick.bind(this, sound)} />
      />
      )
  };

  const classes=classNames(
    className,
    'KeyboardButtonsNames',
  );

  return (
    <div className={classes}>
      {ALL_SOUNDS_NAMES.map(sound => renderButton(sound, {...rest}))}
    </div>
  )
};

KeyboardButtonsNames.propTypes = {

};

KeyboardButtonsNames.defaultProps = {
  
};

export default KeyboardButtonsNames;
