import React from 'react';
import { connect } from 'react-redux';
import MainArea from '../MainArea/MainArea';
import './MainAreaContainer.css';

const MainAreaContainer = ({ darkMode }) => {
  return (
    <div className='MainAreaContainer'>
      <MainArea darkMode={darkMode} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  darkMode: state.sheetsApp.darkMode
});

export default connect(mapStateToProps)(MainAreaContainer);
