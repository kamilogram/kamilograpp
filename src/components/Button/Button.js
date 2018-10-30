import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';
import classNames from 'classnames';

const Button = ({className, onClick, name}) => {
  const classes=classNames(
    className,
    'Button',
  );

  return (
    <button
      className={classes}
      onClick={onClick}>
      {name}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  // onClick: PropTypes.func.isRequired, //TODO przywrócić
  name: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  name: 'Click me',
};

export default Button;
