import React from 'react';

const Services = () => {
  return (
    <div className="services">
      <div className="container">
        <h1>Our Services</h1>
        <p className="services-intro">
          We provide comprehensive lighting solutions for residential, commercial, outdoor, and smart lighting needs.
        </p>

        <div className="services-grid">
          <div className="service-section">
            <h2>Residential Lighting</h2>
            <p>Transform your home with custom lighting solutions that enhance comfort and ambiance.</p>
            <ul>
              <li>Living room and bedroom lighting design</li>
              <li>Kitchen and dining area illumination</li>
              <li>Bathroom and accent lighting</li>
              <li>Outdoor and landscape lighting</li>
            </ul>
          </div>

          <div className="service-section">
            <h2>Commercial Lighting</h2>
            <p>Professional lighting solutions for offices, retail spaces, and commercial establishments.</p>
            <ul>
              <li>Office and workspace lighting</li>
              <li>Retail and showroom illumination</li>
              <li>Restaurant and hospitality lighting</li>
              <li>Industrial and warehouse solutions</li>
            </ul>
          </div>

          <div className="service-section">
            <h2>Outdoor Lighting</h2>
            <p>Weather-resistant lighting systems for exterior spaces and landscape enhancement.</p>
            <ul>
              <li>Facade and architectural lighting</li>
              <li>Garden and pathway illumination</li>
              <li>Security and parking area lighting</li>
              <li>Decorative outdoor fixtures</li>
            </ul>
          </div>

          <div className="service-section">
            <h2>Smart Lighting</h2>
            <p>Intelligent lighting systems with automation, control, and energy efficiency features.</p>
            <ul>
              <li>Automated lighting controls</li>
              <li>Motion and daylight sensors</li>
              <li>Mobile app integration</li>
              <li>Energy-efficient LED systems</li>
            </ul>
          </div>
        </div>

        <section className="why-choose-us">
          <h2>Why Choose M Square Lighting?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Custom Design</h3>
              <p>Tailored lighting solutions that match your unique architectural needs and aesthetic preferences.</p>
            </div>
            <div className="benefit-card">
              <h3>Quality Assurance</h3>
              <p>Premium materials and craftsmanship ensure long-lasting, reliable lighting systems.</p>
            </div>
            <div className="benefit-card">
              <h3>Innovation</h3>
              <p>Cutting-edge technology and sustainable solutions for future-ready lighting.</p>
            </div>
            <div className="benefit-card">
              <h3>Expert Team</h3>
              <p>Experienced professionals who understand lighting design and architectural integration.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
