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
      <div className='header'>
        <span>{props.name}</span>
        <span>{props.name2}</span>
      </div>
      {props.children}
    </div>
  );
}

SideUnit.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  name2: PropTypes.string,
};

SideUnit.defaultProps = {
  className: '',
  name2: '',
}

export default SideUnit;
