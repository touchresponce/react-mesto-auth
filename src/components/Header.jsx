import logo from "../images/logo.svg";
import { Link, withRouter, useLocation } from "react-router-dom";

function Header({ loggedIn, email, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого проекта Mesto" />
      {loggedIn ? (
        <div className="header__wrapper">
          <p className="header__email">{email}</p>
          <Link className="header__link" to="/sign-in" onClick={onSignOut}>
            Выйти
          </Link>
        </div>
      ) : (
        <div className="header__wrapper">
          {location.pathname === "/sign-up" ? (
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          ) : (
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default withRouter(Header);
