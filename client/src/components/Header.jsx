import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/portfolio/logo.jpeg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleMenuClick = () => {
    toggleMenu();
    scrollToTop();
  };

  const handleLogoClick = () => {
    scrollToTop();
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo" onClick={handleLogoClick}>
            <img src={logo} alt="M Square Lighting" className="logo-img" />
            <span className="logo-text">M Square Lighting</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              <li><Link to="/" className={isActive('/')} onClick={scrollToTop}>Home</Link></li>
              <li><Link to="/about" className={isActive('/about')} onClick={scrollToTop}>About Us</Link></li>
              <li><Link to="/services" className={isActive('/services')} onClick={scrollToTop}>Services</Link></li>
              <li><Link to="/portfolio" className={isActive('/portfolio')} onClick={scrollToTop}>Portfolio</Link></li>
              <li><Link to="/catalogue" className={isActive('/catalogue')} onClick={scrollToTop}>Catalogue</Link></li>
              <li><Link to="/contact" className={isActive('/contact')} onClick={scrollToTop}>Contact</Link></li>
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="header-cta">
            <Link to="/contact" className="btn btn-primary" onClick={scrollToTop}>Get Quote</Link>
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
            <li><Link to="/" onClick={handleMenuClick} className={isActive('/')}>Home</Link></li>
            <li><Link to="/about" onClick={handleMenuClick} className={isActive('/about')}>About Us</Link></li>
            <li><Link to="/services" onClick={handleMenuClick} className={isActive('/services')}>Services</Link></li>
            <li><Link to="/portfolio" onClick={handleMenuClick} className={isActive('/portfolio')}>Portfolio</Link></li>
            <li><Link to="/catalogue" onClick={handleMenuClick} className={isActive('/catalogue')}>Catalogue</Link></li>
            <li><Link to="/contact" onClick={handleMenuClick} className={isActive('/contact')}>Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

