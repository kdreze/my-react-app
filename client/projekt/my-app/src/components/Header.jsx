import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  }
  const closeMobileMenu = () => {
    if (window.innerWidth <= 768) {
      setIsNavOpen(false);
    }
  }

  return (
    <header className="header">
      <Link to="/">
        <img className="nav-logo" src="/img/logo_no_background.png" alt="Main logo"/>
      </Link>
      <div className='button' onClick={toggleNav}>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </div>
      <div className='login_icon'>
        <Link to="/login">
          <img src="img/login_icon.png" alt="Login icon" />
        </Link>
      </div>
      <nav>
        <ul className={`nav-list ${isNavOpen ? "active" : ""}`}>
          <li className="nav-list-item"><Link to="/about" onClick={closeMobileMenu}>About</Link></li>
          <li className="nav-list-item"><Link to="/database" onClick={closeMobileMenu}>Database</Link></li>
          <li className="nav-list-item"><Link to="/contact" onClick={closeMobileMenu}>Contact</Link></li>
          <li className="nav-list-item"><Link to="/history" onClick={closeMobileMenu}>History</Link></li>     
        </ul>
      </nav>
    </header>
  )
}