import React from 'react';
import './MenuItem.css';
import PropTypes from 'prop-types';

const MenuItem = ({ className, item, onClick }) => {

  return (
    <span
      className='MenuItem'
      onClick={onClick}>
      {item}
    </span>
  );
}


MenuItem.propTypes = {
  item: PropTypes.string,
};

MenuItem.defaultProps = {
  item: 'default menu item',
};

export default MenuItem;
