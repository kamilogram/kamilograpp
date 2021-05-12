import React from 'react';
import './OneSetOfSheets.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import mh from '../../utils/musicHelpers.js';

const OneSetOfSheets = ({className, emptyStavesAmount, ...rest}) => {

  const renderChroma = (musicKeyName, chroma, clef) => (
    <span className='chroma'>
      {mh.getSignByPianoKeyName(mh.deleteChromas(musicKeyName),
      clef, chroma)}
    </span>
  );

  const renderSheet = props =>
    props.musicKeyNames.map((musicKeyName, index) => {
      const chroma = mh.isWithChromas(musicKeyName, props.musicKey);
      return (
        <div key={musicKeyName + index}
          className='oneSheetWithChroma'>
          {chroma && renderChroma(musicKeyName, chroma, props.clef)}
          <span
            className='simultaneousSheet' >
            {mh.getSignByPianoKeyName(musicKeyName, props.clef, props.sheetLength)}
          </span>
        </div>
      )
    }
  );

  const classes=classNames(
    className,
    'OneSetOfSheets',
  );

  //TODO inne podawanie pustych pięciolinii - niezależnie
  return (
    <div
      className={classes}>
      {renderSheet({...rest})}
    </div>
  );
}

OneSetOfSheets.propTypes = {
  className: PropTypes.string,
  emptyStavesAmount: PropTypes.number,
  clef: PropTypes.oneOf(['treble', 'bass']),
  sheetLength: PropTypes.oneOf(["quarter"]),
  musicKey: PropTypes.string.isRequired,
  musicKeyNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

OneSetOfSheets.defaultProps = {
  className: '',
  emptyStavesAmount: 3,
  clef: 'treble',
  sheetLength: 'quarter',
};

export default OneSetOfSheets;
