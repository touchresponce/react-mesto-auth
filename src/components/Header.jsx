import logo from "../images/logo.svg";

export default function Header({ loggedIn, email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого проекта Mesto" />
    </header>
  );
}
