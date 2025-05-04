import React from 'react';
import './SheetsAppLeftPanel.css';
import SideUnit from '../SideUnit/SideUnit';
import musicConsts from '../../musicTheory/musicConstans.js';
const musicKeysOrder = musicConsts.MUSIC_KEYS_ORDER;
const musicKeysButtons = musicConsts.MUSIC_KEYS_BUTTONS;
// const trebleFrom = musicConsts.TREBLE_CLEF_FROM;
const trebleTo = musicConsts.TREBLE_CLEF_TO;
const bassFrom = musicConsts.BASS_CLEF_FROM;
// const bassTo = musicConsts.BASS_CLEF_TO;
// const trebleMarks = musicConsts.TREBLE_CLEF_RANGE_MARKS;
// const bassMarks = musicConsts.BASS_CLEF_RANGE_MARKS;
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
  musicKey,
  maxSoundsInSet,
  showKeyNames,
  isNextSetAfterGuessAll,
  clef,
  actualScope,
  randomizeKeys,
  animation,
  animationSpeed,
  onChangeMusicKey,
  onToggleAnimation,
  onChangeMaxSoundInSetAmount,
  onToggleMusicKeyNamesVis,
  onChangeSwitchingNextSetMode,
  onClefToggle,
  onChangeSheetsRange,
  onRandomizeKeys,
  onChangeAnimationSpeed
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

  return (
    <div className='SheetsAppLeftPanel'>
      <SideUnit
        name='Tonacja'>
        {musicKeysOrder.map((musicKeyButton, key) => (
          <Button
            key={musicKeyButton}
            name={musicKeysButtons[key]}
            onClick={() => onChangeMusicKey(musicKeyButton)}
            className={musicKey === musicKeyButton ? 'chosen' : ''}
          />
        ))}
      </SideUnit>

      <SideUnit
        name='Animacja'>
          <div className='animationContainer'>
            <Button
              name={animation ? "wyłącz" : "uruchom"}
              onClick={onToggleAnimation}
              className={animation ? 'chosen' : ''}
            />
            {animation && (
              <div className="sliderContainer">
                <div className="sliderWrapper">
                  <Button
                    name="+"
                    onClick={() => onChangeAnimationSpeed(Math.max(300, (animationSpeed) - 100))}
                    className="sliderButton"
                  />
                  <span className="sliderLabel">szybciej</span>
                  <input
                    type="range"
                    id="animationSpeed"
                    min="300"
                    max="3000"
                    step="100"
                    value={animationSpeed}
                    onChange={(e) => onChangeAnimationSpeed(parseInt(e.target.value))}
                  />
                  <span className="sliderLabel">wolniej</span>
                  <Button
                    name="-"
                    onClick={() => onChangeAnimationSpeed(Math.min(3000, animationSpeed + 100))}
                    className="sliderButton"
                  />
                </div>
                <div className="currentSpeed">
                  Aktualna prędkość: {animationSpeed === 300 ? 29 : Math.floor(30 - ((animationSpeed - 300) / (3000 - 300)) * 29)}
                </div>
              </div>
            )}
          </div>
        </SideUnit>

        <SideUnit
        name='Losowanie tonacji'>
        <Button
          value={maxSoundsInSet}
          onClick={() => {
            onRandomizeKeys();
            onChangeMusicKey();
          }}
          name={randomizeKeys ? 'przestań losować' : 'losuj'}
        />
      </SideUnit>

      <SideUnit
        name='Ilość nut jednocześnie'>
        <UneditableIntegerInput
          value={maxSoundsInSet}
          onClick={onChangeMaxSoundInSetAmount}
          min={MIN_SOUNDS_AMOUNT_IN_ONE_SET}
          max={MAX_SOUNDS_AMOUNT_IN_ONE_SET}
        />
      </SideUnit>

      {!animation && (<SideUnit
        name='Oznaczenia na klawiaturze'>
        <Button
          name={showKeyNames ? 'ukryj' : 'pokaż'}
          onClick={onToggleMusicKeyNamesVis}
        />
      </SideUnit>)}

      {!animation && (<SideUnit
        name={renderGoingToTheNextSetMode(isNextSetAfterGuessAll)}>
        <Button
          name='zmień'
          onClick={onChangeSwitchingNextSetMode}
        />
      </SideUnit>)}

      <SideUnit
        name='Klucz'>
        {['treble', 'bass', 'both'].map(buttonClef =>
          <Button
            key={buttonClef + 'Clef'}
            name={getClefName(buttonClef)}
            onClick={() => onClefToggle(buttonClef)}
            className={clef === buttonClef ? 'chosen' : ''}
          />
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
          onChange={onChangeSheetsRange}
          allowCross={false}
          pushable={maxSoundsInSet * 2 - 1}
          defaultValue={[actualScope.from, actualScope.to]}
          value={[actualScope.from, actualScope.to]}
        />
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
  onToggleAnimation: PropTypes.func.isRequired,
  onChangeMaxSoundInSetAmount: PropTypes.func.isRequired,
  onToggleMusicKeyNamesVis: PropTypes.func.isRequired,
  onChangeSwitchingNextSetMode: PropTypes.func.isRequired,
  onClefToggle: PropTypes.func.isRequired,
  onRandomizeKeys: PropTypes.func.isRequired,
  onChangeAnimationSpeed: PropTypes.func.isRequired,
};

SheetsAppLeftPanel.defaultProps = {

};

export default SheetsAppLeftPanel;
