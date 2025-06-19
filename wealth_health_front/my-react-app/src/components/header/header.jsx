import { Link } from 'react-router-dom';
import Logo from "../../assets/logo.png"
import './header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <img id="logo"
            alt="Logo Wealth Health"
            src={Logo}
            onClick={() => (location.href = "/")}/>
        <nav className="header__nav">
          <Link to="/">Créer un employé</Link>
          <Link to="/employees">Liste des employés</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
