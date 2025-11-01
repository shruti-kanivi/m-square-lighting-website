import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/portfolio/logo.jpeg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <img src={logo} alt="M Square Lighting" className="footer-logo-img" />
              <h3>M Square Lighting</h3>
              <p className="tagline">Rest Assured</p>
            </div>
            <p>
              Modern lighting solutions that seamlessly integrate into spaces 
              with style, innovation, and precision. Based in Bengaluru, Karnataka.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/catalogue">Catalogue</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4>Our Services</h4>
            <ul>
              <li>Residential Lighting</li>
              <li>Commercial Lighting</li>
              <li>Outdoor Lighting</li>
              <li>Smart Lighting</li>
              <li>Architectural Lighting</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact Us</h4>
            <div className="contact-info">
              <p>📍 Bengaluru, Karnataka, India</p>
              <p>📞 Contact for consultation</p>
              <p>✉️ Get in touch via our contact form</p>
            </div>
            
            <div className="business-hours">
              <h5>Business Hours</h5>
              <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
              <p>Sat: 9:00 AM - 4:00 PM</p>
              <p>Sun: Closed</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 M Square Lighting – Rest Assured. All rights reserved.</p>
            <div className="footer-bottom-links">
              <span>Quality Lighting Solutions</span>
              <span>•</span>
              <span>Innovation & Precision</span>
              <span>•</span>
              <span>Bengaluru, Karnataka</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
