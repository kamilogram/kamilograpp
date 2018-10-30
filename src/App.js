import React from 'react';
import HeaderContainer from './components/HeaderContainer/HeaderContainer.js';
import MainAreaContainer from './components/MainAreaContainer/MainAreaContainer';
import Footer from './components/Footer/Footer.js';
import './App.css';
import './styles/fonts.css';

const App = () => {

  return (
    <div className="App">
      <HeaderContainer />
      <MainAreaContainer />
      <Footer/>
    </div>
  );
}

App.propTypes = {

};

App.defaultProps = {

}

export default App;
