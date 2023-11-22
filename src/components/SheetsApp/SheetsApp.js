import React from 'react';
import classNames from 'classnames';
import './SheetsApp.css';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Sheets from '../Sheets/Sheets.js';
import KeyboardButtonsNames from '../KeyboardButtonsNames/KeyboardButtonsNames.js';//
import PianoKeyboard from '../PianoKeyboard/PianoKeyboard.js';
import { IS_MENU, IS_KEY_NAMES_BUTTONS_COMP } from '../../js/appConstans.js';


const SheetsApp = ({ 
  sheetsAppState, 
  onPianoKeyClick, 
  onClick, 
  startPianoKey, 
  endPianoKey, 
  areTwoClefs,
  isTreble,
  isBass,
}) => {
  const classes = classNames(
    'SheetsApp', { withoutMenu: !IS_MENU }
  );

  const sheetsClasses = classNames(
    { 'oneOfClefs' : areTwoClefs }
  );

  return (
    <div
      className={classes}
      onClick={onClick}>
        <div className='SheetsContainer'>
          {isTreble && (
            <Sheets
              className={sheetsClasses}
              musicKey={sheetsAppState.musicKey}
              sheetSets={sheetsAppState.sheetSets}
              actualSheetSet={sheetsAppState.actualSheetSet}
              clef='treble'/>
            )
          }

          {isBass && (
            <Sheets
              className={sheetsClasses}
              musicKey={sheetsAppState.musicKey}
              sheetSets={sheetsAppState.sheetSets}
              actualSheetSet={sheetsAppState.actualSheetSet}
              clef='bass'/>
            )
          }
      </div>

      {IS_KEY_NAMES_BUTTONS_COMP &&
        <KeyboardButtonsNames
          appState={sheetsAppState} />
      }

      <PianoKeyboard
        appState={sheetsAppState}
        from={startPianoKey}
        to={endPianoKey}
        onPianoClick={onPianoKeyClick} />

    </div>
  )
}

SheetsApp.propTypes = {
  areTwoClefs: PropTypes.bool,
  sheetsAppState: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onPianoKeyClick: PropTypes.func.isRequired,
}

SheetsApp.defaultProps = {
  areTwoClefs: false,
};

export default SheetsApp;
