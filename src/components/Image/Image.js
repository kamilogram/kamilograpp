import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Image.css';

const Image = ({className, ...rest}) => {
  const classes = classNames (
    'Image',
    className,
  );

  return (
    <img
      alt='alt name'
      className={classes}
      {...rest}
    />
  )
}

Image.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}

Image.defaultProps = {
  className: '',
}

export default Image;
