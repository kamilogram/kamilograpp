import React from 'react';
import './Chromatics.css';
import PropTypes from 'prop-types';
import _ from 'lodash';
import mh from '../../utils/musicHelpers.js';
import musicConsts from '../../musicTheory/musicConstans.js';
const musicKeys = musicConsts.MUSIC_KEYS;

const Chromatics = ({musicKey}) => {
  const keyValue = _.get(musicKeys, [musicKey]);
  let output = '';
  if(keyValue > 0) output = mh.getChromaSigns('sharp', keyValue)
  else if(keyValue < 0) output = mh.getChromaSigns('flat', -keyValue);

  return (
    <span>
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
