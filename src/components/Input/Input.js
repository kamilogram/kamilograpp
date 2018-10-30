import React from 'react';
import './Input.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Input = ({className, ...rest}) => {
  const classes=classNames(
    className,
    'Input',
  );

  return (
    <input
      className={classes}
      {...rest} />
  );
};


Input.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  value: '',
  readOnly: false,
  placeholder: 'fill me...',
};

export default Input;
