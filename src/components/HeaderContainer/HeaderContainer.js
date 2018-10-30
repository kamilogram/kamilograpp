import './HeaderContainer.css';
import Header from '../Header/Header.js';
import { connect } from 'react-redux';
import { goToPage } from '../../actions/index';

const mapStateToProps = state => ({
  currentPage: state.menu.currentPage,
});

const mapDispatchToProps = dispatch => ({
  onMenuItemClick(menuItem){
    dispatch(goToPage(menuItem))
  },
});

const HeaderContainer = connect (
  mapStateToProps,
  mapDispatchToProps,
)(Header);

export default HeaderContainer;
