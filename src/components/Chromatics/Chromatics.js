import React, { useEffect, useState } from 'react';
import './Chromatics.css';
import PropTypes from 'prop-types';
import _ from 'lodash';
import mh from '../../utils/musicHelpers.js';
import musicConsts from '../../musicTheory/musicConstans.js';
const musicKeys = musicConsts.MUSIC_KEYS;

const Chromatics = ({musicKey, clef}) => {
  const [className, setClassName] = useState(`chromatics`);
  const keyValue = _.get(musicKeys, [musicKey]);
  let output = '';
  if (keyValue > 0) output = mh.getChromaSigns('sharp', keyValue, clef)
  else if (keyValue < 0) output = mh.getChromaSigns('flat', -keyValue, clef);

  useEffect(() => {
    setClassName(`chromatics`)
    setTimeout(() => setClassName(''), 1000)
  }, [musicKey])

  return (
    <span className={className}>
      {output}
    </span>
  )
}

Chromatics.propTypes = {
  musicKey: PropTypes.string.isRequired,
};

Chromatics.defaultProps = {
};

export default Chromatics;
