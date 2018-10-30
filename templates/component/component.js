import React, { Component } from 'react';
import './{{cName}}.css';
//import OtherComponent from '../OtherComponent/OtherComponent.js';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// import _ from 'lodash';
//import h from '../../utils/helpers.js';
// import mh from '../../utils/musicHelpers.js';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import ShouldUpdate from 'js/mixins/shouldUpdate';
// import musicConsts from '../../musicTheory/musicConstans.js';
// import appConsts from '../../js/appConstans.js';
// const someConst = appConsts.SOME_CONST;

export default class {{cName}} extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   someState: someValue,
    // }
    //
    // this.handleSomething = this.handleSomething.bind(this);
  }

  render() {
    const classes=classNames(
      this.props.className,
      '{{cName}}',
    );

    return (
      <div className = {classes}>
        'Your {{cName}} component starts here...'
      </div>
    );
  }
}

// {{cName}}.propTypes = {
//   userInfo: PropTypes.object,
//   cityList: PropTypes.array.isRequired,
//   provinceList: PropTypes.array.isRequired,
// };
//
// {{cName}}.defaultProps = {
//   onePropName: onePropDefaultValue,
//   secondPropName: secondPropDefaultValue,
// };
