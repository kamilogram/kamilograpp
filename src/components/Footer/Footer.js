import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Footer.css';

const Footer = ({className}) => {
  const classes=classNames(
    className,
    'Footer',
  );

  return (
    <div className={classes}>
      To jest wersja DEMO aplikacji do nauki nut na instrumenty klawiszowe "KamilogrAPP". Wraz z upływem czasu do projekt będzie rozbudowywany. Autor Kamil Gliński. Wszelkie prawa zastrzeżone.
    </div>
  )
};

Footer.PropTypes = {
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: '',
}

export default Footer;
