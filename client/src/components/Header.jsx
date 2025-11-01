import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/portfolio/logo.jpeg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <img src={logo} alt="M Square Lighting" className="logo-img" />
            <span className="logo-text">M Square Lighting</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              <li><Link to="/" className={isActive('/')}>Home</Link></li>
              <li><Link to="/about" className={isActive('/about')}>About Us</Link></li>
              <li><Link to="/services" className={isActive('/services')}>Services</Link></li>
              <li><Link to="/portfolio" className={isActive('/portfolio')}>Portfolio</Link></li>
              <li><Link to="/catalogue" className={isActive('/catalogue')}>Catalogue</Link></li>
              <li><Link to="/contact" className={isActive('/contact')}>Contact</Link></li>
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="header-cta">
            <Link to="/contact" className="btn btn-primary">Get Quote</Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-links">
            <li><Link to="/" onClick={toggleMenu} className={isActive('/')}>Home</Link></li>
            <li><Link to="/about" onClick={toggleMenu} className={isActive('/about')}>About Us</Link></li>
            <li><Link to="/services" onClick={toggleMenu} className={isActive('/services')}>Services</Link></li>
            <li><Link to="/portfolio" onClick={toggleMenu} className={isActive('/portfolio')}>Portfolio</Link></li>
            <li><Link to="/catalogue" onClick={toggleMenu} className={isActive('/catalogue')}>Catalogue</Link></li>
            <li><Link to="/contact" onClick={toggleMenu} className={isActive('/contact')}>Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

