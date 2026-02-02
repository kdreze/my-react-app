import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeMobileMenu = () => {
    if (window.innerWidth <= 768) {
      setIsNavOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMobileMenu();
  };

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
      
      {/* User Panel Section */}
      <div className='user-panel-container'>
        {isAuthenticated ? (
          <div className="user-panel">
            <div className="user-avatar">
              <img src="img/login_icon.png" alt="User avatar" />
            </div>
            <div className="user-info">
              <span className="user-greeting">Hello,</span>
              <span className="user-name-display">{user?.name}</span>
            </div>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-button">
            <img src="img/login_icon.png" alt="Login icon" />
            <span>Login</span>
          </Link>
        )}
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
  );
}
