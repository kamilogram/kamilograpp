import React from 'react';
import './Menu.css';
import _ from 'lodash';
import MenuItem from '../MenuItem/MenuItem.js';
import { MENU_ITEMS } from '../../js/appConstans.js';
import classNames from 'classnames';


const Menu = props => {
  return (
    <span className='Menu'>
      <ul className='MenuList'>
        {MENU_ITEMS.map(item => {
          const classes = classNames(
            'MenuListItem', {
              currentPage: item === props.currentPage,
            }
          );

          return (
            <li
              key={item}
              className={classes} >

              <MenuItem
                item={item}
                onClick={props.onClick.bind(null, item)} />
            </li>
          );
        })}
      </ul>
    </span>
  )
};

Menu.propTypes = {

};

Menu.defaultProps = {

};

export default Menu;
