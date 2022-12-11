import headerLogo from "../images/header-logo.svg";
import { Link, Route, Switch } from 'react-router-dom';



function Header(props) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Логотип - Mesto Russia"
      />
	  <Route exact path='/'>
		<div className='header__container'>
		  <p className='header__email'>{props.email}</p>
		  <button to='/signin' className='header__button' onClick={props.onSignOut}>Выйти</button>
		</div>
	  </Route>
	  <Route path='/signup'>
		<Link to='/signin' className='header__link'>Войти</Link>
	  </Route>
	  <Route path='/signin'>
		<Link to='/signup' className='header__link'>Регистрация</Link>
	  </Route>
    </header>
  );
}

export default Header;
