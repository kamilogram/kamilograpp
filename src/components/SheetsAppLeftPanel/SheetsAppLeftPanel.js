import React from 'react';
import './SheetsAppLeftPanel.css';
import SideUnit from '../SideUnit/SideUnit';
import musicConsts from '../../musicTheory/musicConstans.js';
const musicKeysOrder = musicConsts.MUSIC_KEYS_ORDER;
const trebleMarks = musicConsts.TREBLE_CLEF_RANGE_MARKS;
import UneditableIntegerInput from '../UneditableIntegerInput/UneditableIntegerInput';
import Button from '../Button/Button';
import mh from '../../utils/musicHelpers.js';
import {
  MIN_SOUNDS_AMOUNT_IN_ONE_SET,
  MAX_SOUNDS_AMOUNT_IN_ONE_SET,
  TREBLE_CLEF_FROM,
  TREBLE_CLEF_TO,
} from '../../js/appConstans.js';
import PropTypes from 'prop-types';
import RangeSlider from '../RangeSlider/RangeSlider';


const SheetsAppLeftPanel = props => {

  const renderGoingToTheNextSetMode = mode => {
    const text = mode ? 'aż do odgadnięcia wszystkich nut.' : 'tyle ile nut.'
    return 'Ilość prób: ' + text;
  };

  return (
    <div className='SheetsAppLeftPanel'>

      <SideUnit
        name='Tonacja'>
        {musicKeysOrder.map(musicKeyButton => (
          <Button
            key={musicKeyButton}
            name={musicKeyButton}
            onClick={props.onChangeMusicKey.bind(null, musicKeyButton)} />
        ))}
      </SideUnit>

      <SideUnit
        name='Ilość nut jednocześnie'>
        <UneditableIntegerInput
          value={props.sheetsAppState.maxSoundsInSet}
          onClick={diff => props.onChangeMaxSoundInSetAmount(diff)}
          min={MIN_SOUNDS_AMOUNT_IN_ONE_SET}
          max={MAX_SOUNDS_AMOUNT_IN_ONE_SET}/>
      </SideUnit>

      <SideUnit
        name='Oznaczenia na klawiaturze'>
        <Button
          name={props.sheetsAppState.showKeyNames ? 'ukryj' : 'pokaż'}
          onClick={props.onToggleMusicKeyNamesVis} />
      </SideUnit>

      <SideUnit
        name={renderGoingToTheNextSetMode(props.sheetsAppState.isNextSetAfterGuessAll)}>
        <Button
          name='zmień'
          onClick={props.onChangeSwitchingNextSetMode} />
      </SideUnit>

      <SideUnit
        name='Klucz'>
        {['treble', 'bass'].map(clef =>
          <Button
            key={clef + 'Clef'}
            name={clef === 'treble' ? 'wiolinowy' : 'basowy'}
            onClick={clef => props.onClefToggle(clef)} />
        )}
      </SideUnit>

      <SideUnit name='Zakres nut'>
        <RangeSlider
          min={0}
          max={mh.calcSoundNumberFromScopeByName(TREBLE_CLEF_FROM, TREBLE_CLEF_TO)}
          step={null}
          marks={trebleMarks}
          onAfterChange={props.onChangeSheetsRange}
          allowCross={false}
          pushable={props.sheetsAppState.maxSoundsInSet * 2 - 1}
          defaultValue={[
            mh.calcSoundNumberFromScopeByName(TREBLE_CLEF_FROM,  props.sheetsAppState.sheetsToDraw.from),
            mh.calcSoundNumberFromScopeByName(TREBLE_CLEF_FROM,  props.sheetsAppState.sheetsToDraw.to),
          ]} />
      </SideUnit>

    </div>
  );
}

SheetsAppLeftPanel.propTypes = {
  sheetsAppState: PropTypes.object.isRequired,
  onChangeMusicKey: PropTypes.func.isRequired,
  onChangeMaxSoundInSetAmount: PropTypes.func.isRequired,
  onToggleMusicKeyNamesVis: PropTypes.func.isRequired,
  onChangeSwitchingNextSetMode: PropTypes.func.isRequired,
  onClefToggle: PropTypes.func.isRequired,
};

SheetsAppLeftPanel.defaultProps = {

};

export default SheetsAppLeftPanel;
