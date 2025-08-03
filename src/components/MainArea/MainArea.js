import React from 'react';
import { IS_RIGHT_PANEL, IS_MENU } from '../../js/appConstans.js';
import SheetsAppContainer from '../SheetsAppContainer/SheetsAppContainer.js';
import SheetsAppLeftPanelContainer from '../SheetsAppLeftPanelContainer/SheetsAppLeftPanelContainer';
import SidePanelContainer from '../SidePanelContainer/SidePanelContainer';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './MainArea.css';
import classNames from 'classnames';


function MainArea({ darkMode }) {
  const classes = classNames(
    'MainArea', { withoutMenu: !IS_MENU, darkMode },
  );
  /*
    componentDidMount() {
      this.context.store.dispatch({
        type: 'RENDER_NEW_SHEET_SETS',
      });
    }
    // to było w starej wersji klasowej, żeby nie było za każdym razem defaultowe nuty E-F-G-H na początku
  */

  return (
    <div className={classes}>
      <SidePanelContainer
        className='LeftPanel'
        panel='leftPanel'
        header='Opcje'>
          <SheetsAppLeftPanelContainer />
      </SidePanelContainer>

      {IS_RIGHT_PANEL &&
        <SidePanelContainer
          className='RightPanel'
          panel='rightPanel'>
        </SidePanelContainer>
      }

      <SheetsAppContainer />
    </div>
  );
}

export default MainArea;
