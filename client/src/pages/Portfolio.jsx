import React, { useState } from 'react';
import SEO from '../components/SEO';
import LazyImage from '../components/LazyImage';
import ImageModal from '../components/ImageModal';

// Import all portfolio images
import image1 from '../assets/portfolio/1.jpeg';
import image2 from '../assets/portfolio/2.jpeg';
import image3 from '../assets/portfolio/3.jpeg';
import image4 from '../assets/portfolio/4.jpeg';
import image5 from '../assets/portfolio/5.jpeg';
import image6 from '../assets/portfolio/6.jpeg';
import image7 from '../assets/portfolio/7.jpeg';
import image8 from '../assets/portfolio/image_1.jpeg';
import image9 from '../assets/portfolio/image_2.jpeg';
import image10 from '../assets/portfolio/image_3.jpeg';
import image11 from '../assets/portfolio/image_4.jpeg';
import image12 from '../assets/portfolio/image_5.jpeg';
import image13 from '../assets/portfolio/image_6.jpeg';
import image14 from '../assets/portfolio/image_7.jpeg';
import image15 from '../assets/portfolio/image_8.jpeg';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  // Portfolio items with categories
  const portfolioItems = [
    { id: 1, image: image1, category: 'commercial', title: 'Modern Office Lighting', description: 'Contemporary office space with linear LED systems' },
    { id: 2, image: image2, category: 'residential', title: 'Luxury Home Interior', description: 'Custom residential lighting with architectural features' },
    { id: 3, image: image3, category: 'commercial', title: 'Retail Showroom', description: 'Dynamic retail lighting enhancing product displays' },
    { id: 4, image: image4, category: 'architectural', title: 'Facade Lighting', description: 'Architectural facade illumination project' },
    { id: 5, image: image5, category: 'residential', title: 'Living Room Design', description: 'Ambient and task lighting for modern living spaces' },
    { id: 6, image: image6, category: 'commercial', title: 'Conference Room', description: 'Professional meeting space with adjustable lighting' },
    { id: 7, image: image7, category: 'outdoor', title: 'Landscape Lighting', description: 'Outdoor garden and pathway illumination' },
    { id: 8, image: image8, category: 'architectural', title: 'Linear Systems', description: 'Sleek linear lighting installations' },
    { id: 9, image: image9, category: 'residential', title: 'Kitchen Lighting', description: 'Task and ambient lighting for culinary spaces' },
    { id: 10, image: image10, category: 'commercial', title: 'Restaurant Ambiance', description: 'Hospitality lighting creating perfect atmosphere' },
    { id: 11, image: image11, category: 'architectural', title: 'Acoustic Lighting', description: 'Lighting with integrated sound absorption' },
    { id: 12, image: image12, category: 'outdoor', title: 'Building Exterior', description: 'External architectural lighting features' },
    { id: 13, image: image13, category: 'residential', title: 'Bedroom Design', description: 'Relaxing bedroom lighting with multiple zones' },
    { id: 14, image: image14, category: 'commercial', title: 'Corporate Lobby', description: 'Impressive entrance lighting for corporate spaces' },
    { id: 15, image: image15, category: 'architectural', title: 'Custom Fixtures', description: 'Bespoke lighting fixtures crafted to order' },
  ];

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'residential', label: 'Residential' },
    { key: 'commercial', label: 'Commercial' },
    { key: 'architectural', label: 'Architectural' },
    { key: 'outdoor', label: 'Outdoor' },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <>
      <SEO 
        title="Portfolio - M Square Lighting | Our Lighting Projects"
        description="Explore our diverse portfolio of residential, commercial, architectural, and outdoor lighting projects. Quality craftsmanship and innovative designs."
        keywords="lighting portfolio, lighting projects, commercial lighting examples, residential lighting gallery, architectural lighting showcase"
      />
      <div className="portfolio">
        <div className="container">
        <h1>Our Portfolio</h1>
        <p className="portfolio-intro">
          Explore our diverse range of lighting projects showcasing innovative designs, 
          quality craftsmanship, and transformative lighting solutions.
        </p>

        {/* Category Filter */}
        <div className="portfolio-filters">
          {categories.map((category) => (
            <button
              key={category.key}
              className={`filter-btn ${selectedCategory === category.key ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="portfolio-grid">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="portfolio-item"
              onClick={() => setSelectedImage(item)}
            >
              <div className="portfolio-image">
                <LazyImage src={item.image} alt={item.title} />
                <div className="portfolio-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="view-more">Click to view</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Image Modal */}
        {selectedImage && (
          <ImageModal 
            image={selectedImage} 
            onClose={() => setSelectedImage(null)} 
          />
        )}

        {/* Call to Action */}
        <section className="portfolio-cta">
          <h2>Ready to Transform Your Space?</h2>
          <p>Let's discuss your lighting project and create something extraordinary together.</p>
          <button className="btn btn-primary">Get In Touch</button>
        </section>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
