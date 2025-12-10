import { useState } from 'react';
import './Header.css';

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <header className="header">
      <img className="nav-logo" src="/img/logo_no_background.png" alt="Main logo"/>
      <div className='button' onClick={toggleNav}>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </div>
      <nav>
        <ul className={`nav-list ${isNavOpen ? "active" : ""}`}>
          <li className="nav-list-item">Main</li>
          <li className="nav-list-item">About</li>
          <li className="nav-list-item">Database</li>
          <li className="nav-list-item">Contact</li>
        </ul>
      </nav>
    </header>
  )
}