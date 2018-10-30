import React from 'react';
import './SidePanel.css';
import '../../../resources/icons/style.css';
import classNames from 'classnames';
import Button from '../Button/Button.js';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { IS_MENU } from '../../js/appConstans.js';


const SidePanel = ({ onCloseClick, onButtonClick, header, children, open }) => {

  const classes=classNames(
    'SidePanel', { withoutMenu: !IS_MENU, }
  );

  return (
    <div className='SidePanelContainer'>
      <ReactCSSTransitionGroup
        transitionName='toggleSidePanelAnim'
        transitionEnterTimeout={800}
        transitionLeaveTimeout={800}>

        {open
          && <div className={classes} >
            <div className='sidePanelHeader'>
              <span>{header}</span>
              <Button
                name='X'
                onClick={onCloseClick}
              />
            </div>

            {children}
          </div>
        }

        {!open
          && <div
            className='panelOpeningButton'
            onClick={onButtonClick}>
            <span className='panelOpeningButtonImg icon-equalizer'/>
            <span
              className='panelOpeningButtonText'
              title='Opcje'>
              Opcje
            </span>
          </div>
        }
      </ReactCSSTransitionGroup>
    </div>
  )
};

SidePanel.propTypes = {
  header: PropTypes.string,

  onCloseClick: PropTypes.func.isRequired,
};

SidePanel.defaultProps = {
  header: 'Nagłówek',
}

export default SidePanel;
