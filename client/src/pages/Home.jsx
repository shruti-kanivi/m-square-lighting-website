import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <>
      <SEO 
        title="M Square Lighting - Professional Lighting Solutions | Rest Assured"
        description="Transform your space with M Square Lighting's custom architectural luminaires, downlighters, linear lighting, and acoustic lighting solutions. Expert design and installation in Bengaluru."
        keywords="M Square Lighting, architectural lighting, downlighters, linear lighting, acoustic lighting, LED solutions, Bengaluru lighting, commercial lighting, residential lighting"
      />
      <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>M Square Lighting – <span>Rest Assured</span></h1>
          <p>Modern lighting solutions that seamlessly integrate into spaces with style, innovation, and precision.</p>
          <div className="hero-buttons">
            <Link to="/services" className="btn btn-primary">Explore Our Services</Link>
            <Link to="/portfolio" className="btn btn-secondary">View Portfolio</Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="services-overview">
        <div className="container">
          <h2>Our Lighting Solutions</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Architectural Luminaires</h3>
              <p>Custom architectural lighting that enhances your design vision.</p>
            </div>
            <div className="service-card">
              <h3>Downlighters</h3>
              <p>Precision downlighting systems for focused illumination.</p>
            </div>
            <div className="service-card">
              <h3>Linear Lighting</h3>
              <p>Sleek linear systems for modern, continuous lighting.</p>
            </div>
            <div className="service-card">
              <h3>Acoustic Lighting</h3>
              <p>Innovative lighting with integrated sound absorption features.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Mission */}
      <section className="mission">
        <div className="container">
          <h2>Our Mission</h2>
          <p>
            At M Square Lighting, our mission is to provide high-quality, design-focused lighting 
            solutions that bring creativity and functionality together. We go beyond standard 
            fixtures to offer customizable, reliable, and future-ready lighting that transforms 
            every space while giving our customers the confidence to truly "Rest Assured."
          </p>
        </div>
      </section>
      </div>
    </>
  );
};

export default Home;
