import React from 'react';
import './RangeSlider.css';
import classNames from 'classnames';
// import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const RangeSlider = props => {
  const classes = classNames(
    props.className,
    'RangeSlider',
  );

  return (
    <div className={classes}>
      <Slider.Range
        {...props} />
    </div>
  );
}

RangeSlider.propTypes = {

};

RangeSlider.defaultProps = {

};

export default RangeSlider
