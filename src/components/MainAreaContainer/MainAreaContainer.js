import React from 'react';
import MainArea from '../MainArea/MainArea';
import SheetsAppContainer from '../SheetsAppContainer/SheetsAppContainer.js';
import SheetsAppLeftPanelContainer from '../SheetsAppLeftPanelContainer/SheetsAppLeftPanelContainer';
import './MainAreaContainer.css';

const MainAreaContainer = () => {

  return (
    <div className='MainAreaContainer'>
      <MainArea>
        <SheetsAppContainer
          left={
            <SheetsAppLeftPanelContainer />
          } />

      </MainArea>
    </div>
  );
}

MainAreaContainer.propTypes = {

};

MainAreaContainer.defaultProps = {

};

export default MainAreaContainer;
