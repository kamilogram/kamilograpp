import React from 'react';
import './Header.css'
import Menu from '../Menu/Menu.js';
import Image from '../Image/Image.js';
import logo from '../../../resources/images/kamilograppLogoNew.png';
import { IS_MENU } from '../../js/appConstans.js';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Header = props => {
  const classes = classNames(
    'Header', {withoutMenu: !IS_MENU}
  )
  return (
    <div className={classes}>
      <Image
        className='Logo'
        src={logo}
        alt='kamilograppLogo'
      />
      {IS_MENU && <Menu
        currentPage={props.currentPage}
        onClick={props.onMenuItemClick} />}
    </div>
  )
}

Header.propTypes = {
  onMenuItemClick: PropTypes.func.isRequired,
};

Header.defaultProps = {

};

export default Header;
