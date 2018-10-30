import React from 'react';
import './UneditableIntegerInput.css';
import Input from '../Input/Input.js';
import Button from '../Button/Button.js';
import classNames from 'classnames';
import _ from 'lodash';

const UneditableIntegerInput = ({className, value, ...rest}) => {

  const renderMoreLessButton = (value, sign, diff, {min, max, onClick}) => {
    let inactive = false;
    if((diff < 0 && _.isEqual(value, min))
      || (diff > 0 && _.isEqual(value, max)))
      inactive = true;
    const classes=classNames(
      'moreLessButton',
      {
        inactive: inactive,
      }
    );

    return(
      <Button
        className={classes}
        onClick={onClick.bind(this, diff)}
        name={sign}>
      </Button>
    )
  }

  const classes=classNames(
    className,
    'UneditableIntegerInput',
  );

  return (
    <div className={classes}>
      {renderMoreLessButton(value, '<', -1, {...rest})}
      <Input
        value={value}
        readOnly />
      {renderMoreLessButton(value, '>', 1, {...rest})}
    </div>
  );
}

// UneditableIntegerInput.propTypes = {
//   onePropName: onePropDefaultValue,
//   secondPropName: secondPropDefaultValue,
// };
//
// UneditableIntegerInput.defaultProps = {
//   userInfo: React.PropTypes.object,
//   cityList: React.PropTypes.array.isRequired,
//   provinceList: React.PropTypes.array.isRequired,
// };

export default UneditableIntegerInput;
