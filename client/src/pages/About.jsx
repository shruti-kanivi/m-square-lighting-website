import React from 'react';

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <h1>About M Square Lighting</h1>
        
        <section className="company-intro">
          <h2>Who We Are</h2>
          <p>
            M Square Lighting – Rest Assured is a modern lighting solutions company based in 
            Bengaluru, Karnataka, India. We specialize in customized and architectural lighting, 
            delivering products that seamlessly integrate into spaces with style, innovation, and precision.
          </p>
        </section>

        <section className="what-we-do">
          <h2>What We Do</h2>
          <p>We create tailor-made lighting systems designed to match unique architectural needs.</p>
          
          <div className="product-range">
            <h3>Our Product Range</h3>
            <ul>
              <li><strong>Architectural luminaires</strong> - Custom lighting that enhances architectural design</li>
              <li><strong>Downlighters</strong> - Precision lighting for focused illumination</li>
              <li><strong>Linear lighting systems</strong> - Modern, continuous lighting solutions</li>
              <li><strong>Acoustic lighting solutions</strong> - Lighting with integrated sound absorption features</li>
              <li><strong>Bespoke fixtures</strong> - Crafted to order for unique requirements</li>
            </ul>
          </div>
        </section>

        <section className="our-values">
          <h2>Our Values</h2>
          <p>
            Every product is created with an emphasis on innovation, sustainability, and aesthetics, 
            ensuring our lighting does more than illuminate — it inspires.
          </p>
        </section>

        <section className="who-we-serve">
          <h2>Who We Serve</h2>
          <div className="clients-grid">
            <div className="client-card">
              <h3>Architects & Interior Designers</h3>
              <p>Looking for lighting that enhances their designs</p>
            </div>
            <div className="client-card">
              <h3>Builders & Contractors</h3>
              <p>Seeking reliable, project-ready solutions</p>
            </div>
            <div className="client-card">
              <h3>Corporate Clients</h3>
              <p>For offices, retail outlets, and commercial spaces</p>
            </div>
            <div className="client-card">
              <h3>Homeowners</h3>
              <p>Who want bespoke, premium lighting tailored to their lifestyle</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
