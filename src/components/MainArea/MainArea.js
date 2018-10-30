import React, { Component } from 'react';
import { IS_RIGHT_PANEL, IS_MENU } from '../../js/appConstans.js';
import SidePanelContainer from '../SidePanelContainer/SidePanelContainer';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './MainArea.css';
import classNames from 'classnames';


export default class MainArea extends Component {

  static contextTypes = {
    store: PropTypes.object
  }

  componentDidMount() {
    this.context.store.dispatch({
      type: 'RENDER_NEW_SHEET_SETS',
    });
  }

  render() {
    const classes=classNames(
      'MainArea', { withoutMenu: !IS_MENU },
    );

    return (
      <div className={classes}>

        <SidePanelContainer
          className='LeftPanel'
          panel='leftPanel'
          header='Opcje'>
          {this.props.children.props.left}
        </SidePanelContainer>

        {IS_RIGHT_PANEL &&
          <SidePanelContainer
            className='RightPanel'
            panel='rightPanel' >
            {this.props.children.props.right}
          </SidePanelContainer>
        }

        {this.props.children}

      </div>
    );
  }
}

MainArea.propTypes = {

};

MainArea.defaultProps = {

}
