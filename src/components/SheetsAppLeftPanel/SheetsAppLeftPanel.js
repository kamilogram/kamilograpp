import React from 'react';
import './SheetsAppLeftPanel.css';
import SideUnit from '../SideUnit/SideUnit';
import musicConsts from '../../musicTheory/musicConstans.js';
const musicKeysOrder = musicConsts.MUSIC_KEYS_ORDER;
const trebleFrom = musicConsts.TREBLE_CLEF_FROM;
const trebleTo = musicConsts.TREBLE_CLEF_TO;
const bassFrom = musicConsts.BASS_CLEF_FROM;
const bassTo = musicConsts.BASS_CLEF_TO;
const trebleMarks = musicConsts.TREBLE_CLEF_RANGE_MARKS;
const bassMarks = musicConsts.BASS_CLEF_RANGE_MARKS;
const bothMarks = musicConsts.BOTH_CLEFS_RANGE_MARKS;
import UneditableIntegerInput from '../UneditableIntegerInput/UneditableIntegerInput';
import Button from '../Button/Button';
import mh from '../../utils/musicHelpers.js';
import {
  MIN_SOUNDS_AMOUNT_IN_ONE_SET,
  MAX_SOUNDS_AMOUNT_IN_ONE_SET,
} from '../../js/appConstans.js';
import PropTypes from 'prop-types';
import RangeSlider from '../RangeSlider/RangeSlider';


const SheetsAppLeftPanel = ({
  maxSoundsInSet,
  showKeyNames,
  isNextSetAfterGuessAll,
  sheetsToDraw,
  onChangeMusicKey,
  onChangeMaxSoundInSetAmount,
  onToggleMusicKeyNamesVis,
  onChangeSwitchingNextSetMode,
  onClefToggle,
  onChangeSheetsRange,
  clef,
}) => {

  const renderGoingToTheNextSetMode = mode => {
    const text = mode ? 'aż do odgadnięcia wszystkich nut.' : 'tyle ile nut.'
    return 'Ilość prób: ' + text;
  };

  const getClefName = clef => {
    switch (clef) {
      case 'treble':
        return 'wiolinowy';
      case 'bass':
        return 'basowy';
      case 'both':
        return 'oba';
    }
  }

  const clefScope = {
    from: clef === "treble" ? trebleFrom : bassFrom,
    to: clef === "treble" ? trebleTo : bassTo,
  }

  return (
    <div className='SheetsAppLeftPanel'>

      <SideUnit
        name='Tonacja'>
        {musicKeysOrder.map(musicKeyButton => (
          <Button
            key={musicKeyButton}
            name={musicKeyButton}
            onClick={onChangeMusicKey.bind(null, musicKeyButton)}
          />
        ))}
      </SideUnit>

      <SideUnit
        name='Ilość nut jednocześnie'>
        <UneditableIntegerInput
          value={maxSoundsInSet}
          onClick={diff => onChangeMaxSoundInSetAmount(diff)}
          min={MIN_SOUNDS_AMOUNT_IN_ONE_SET}
          max={MAX_SOUNDS_AMOUNT_IN_ONE_SET}/>
      </SideUnit>

      <SideUnit
        name='Oznaczenia na klawiaturze'>
        <Button
          name={showKeyNames ? 'ukryj' : 'pokaż'}
          onClick={onToggleMusicKeyNamesVis} />
      </SideUnit>

      <SideUnit
        name={renderGoingToTheNextSetMode(isNextSetAfterGuessAll)}>
        <Button
          name='zmień'
          onClick={onChangeSwitchingNextSetMode} />
      </SideUnit>

      <SideUnit
        name='Klucz'>
        {['treble', 'bass', 'both'].map(clef =>
          <Button
            key={clef + 'Clef'}
            name={getClefName(clef)}
            onClick={() => onClefToggle(clef)} />
        )}
      </SideUnit>

      <SideUnit name='Zakres nut'>
        <RangeSlider
          min={0}
          // max={mh.calcSoundNumberFromScopeByName(clefScope.from, clefScope.to)}
          max={mh.calcSoundNumberFromScopeByName(bassFrom, trebleTo)}
          step={null}
          // marks={clef === 'treble' ? trebleMarks : bassMarks}
          marks={bothMarks}
          onAfterChange={onChangeSheetsRange}
          allowCross={false}
          pushable={maxSoundsInSet * 2 - 1}
          defaultValue={[
            mh.calcSoundNumberFromScopeByName(clefScope.from,  sheetsToDraw.from),
            mh.calcSoundNumberFromScopeByName(clefScope.from,  sheetsToDraw.to),
          ]} />
      </SideUnit>

    </div>
  );
}

SheetsAppLeftPanel.propTypes = {
  maxSoundsInSet: PropTypes.number.isRequired,
  showKeyNames: PropTypes.bool.isRequired,
  isNextSetAfterGuessAll: PropTypes.bool.isRequired,
  sheetsToDraw: PropTypes.object.isRequired,
  onChangeMusicKey: PropTypes.func.isRequired,
  onChangeMaxSoundInSetAmount: PropTypes.func.isRequired,
  onToggleMusicKeyNamesVis: PropTypes.func.isRequired,
  onChangeSwitchingNextSetMode: PropTypes.func.isRequired,
  onClefToggle: PropTypes.func.isRequired,
};

SheetsAppLeftPanel.defaultProps = {

};

export default SheetsAppLeftPanel;
