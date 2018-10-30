import React from 'react';
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

const {{cName}} = props => {
// const {{cName}} = ({className, ...rest}) => {

  // const someFunction = (props) => {
  // // const someFunction = ({someProp, someProp2, ...rest}) => {
  //
  //   // return(
  //
  //   // )
  // }

  const classes=classNames(
    props.className,
    // className,
    '{{cName}}',
  );

  return (
    <div className = {classes}>
      'Your {{cName}} component starts here...'
    </div>
  );
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

export default {{cName}}
