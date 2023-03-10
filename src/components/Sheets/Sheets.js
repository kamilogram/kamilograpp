import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import './Sheets.css';
import PropTypes from 'prop-types';
import Chromatics from '../Chromatics/Chromatics.js';
import OneSetOfSheets from '../OneSetOfSheets/OneSetOfSheets.js';
import Image from '../Image/Image.js';
import mh from '../../utils/musicHelpers.js';
import trebleClef from '../../../resources/images/trebleClef.png';
import bassClef from '../../../resources/images/bassClef.png';

const TrebleClef = () => {
  return (
    <span className='clef'>
      {mh.getStave(4)}
      <Image
        className='trebleClef'
        src={trebleClef}
        alt='trebleClef'
      />
    </span>
  )
}

const BassClef = () => {
  return (
    <span className='clef'>
      {mh.getStave(4)}
      <Image
        className='bassClef hhh'
        src={bassClef}
        alt='bassClef'
      />
    </span>
  )
}


const Sheets = ({className, musicKey, sheetSets, actualSheetSet, clef='treble'}) => {
  const renderSheetSets = (sheetSets, actualSheetSet, musicKey) => {
    return _.map(sheetSets, (sheetSet, index) => {
      const classes = classNames({
        actualSet: actualSheetSet === index,
      });

      return (
        <OneSetOfSheets
          key={sheetSet + index}
          className={classes}
          musicKeyNames={sheetSet}
          // emptyStavesAmount={emptyStavesAmount}
          musicKey={musicKey}
          clef={clef}
        />
      );
    });
  };

  const vert = mh.getSign('verticalLine');

  const classes=classNames(
    className,
    'Sheets',
  );

  //TODO clef i sign i highlightActual (nowy) jako propsy
  return (
    <div className='SheetsSetContainer'>
      <div className={classes}>
        <span className='preambule'>
          {vert}
          {mh.getStave()}
          {clef === 'treble' && <TrebleClef />}
          {clef === 'bass' && <BassClef />}
          <Chromatics musicKey={musicKey} clef={clef}/>
          {mh.getStave()}
          {mh.getSign('4-4')}
          {mh.getStave()}
        </span>
        <span className='sheetsField'>
          <span className='staveField'>
            {mh.getStave(28)}
          </span>
          <div className='SheetSets'>
            {renderSheetSets(sheetSets, actualSheetSet, musicKey)}
          </div>
        </span>
        <span className='endingLine'>
          {vert}
        </span>
      </div>
    </div>
  )
}

Sheets.propTypes = {
  className: PropTypes.string,
  actualSheetSet: PropTypes.number,

  sheetSets: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  musicKey: PropTypes.string.isRequired,

};

//TODO jak jest jedna nuta to żeby uwzględniało bez tablicy
Sheets.defaultProps = {
  className: '',
  actualSheetSet: 0,
};

export default Sheets;
