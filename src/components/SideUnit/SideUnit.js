import React from 'react';
import './SideUnit.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';


const SideUnit = props => {
  const classes=classNames(
    props.className,
    'SideUnit',
  );

  return (
    <div className={classes}>
      <div className='header'>{props.name}</div>
      {props.children}
    </div>
  );
}

SideUnit.propTypes = {
  className: PropTypes.string,

  name: PropTypes.string.isRequired,
};

SideUnit.defaultProps = {
  className: '',
}

export default SideUnit;
