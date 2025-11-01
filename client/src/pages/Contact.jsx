import React, { useState } from 'react';
import { api } from '../utils/api';
import SEO from '../components/SEO';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear status when user starts typing
    if (submitStatus.message) {
      setSubmitStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const response = await api.submitContactForm(formData);
      
      setSubmitStatus({
        type: 'success',
        message: response.message || 'Thank you for your inquiry! We will get back to you soon.'
      });
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to send your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us - M Square Lighting | Get a Free Consultation"
        description="Contact M Square Lighting for professional lighting solutions. Free consultation, custom design, and expert installation. Serving Bengaluru and Pan-India."
        keywords="contact M Square Lighting, lighting consultation, lighting quote, Bengaluru lighting company"
      />
      <div className="contact">
        <div className="container">
        <h1>Get In Touch</h1>
        <p className="contact-intro">
          Ready to illuminate your space? Contact us for a consultation and let's bring your lighting vision to life.
        </p>

        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Send Us A Message</h2>
            
            {submitStatus.message && (
              <div className={`alert alert-${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="projectType">Project Type *</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Project Type</option>
                  <option value="residential">Residential Lighting</option>
                  <option value="commercial">Commercial Lighting</option>
                  <option value="outdoor">Outdoor Lighting</option>
                  <option value="smart">Smart Lighting</option>
                  <option value="architectural">Architectural Lighting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Project Details *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your lighting project, space requirements, timeline, and any specific needs..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="contact-info-section">
            <h2>Contact Information</h2>
            
            <div className="contact-info">
              <div className="info-item">
                <h3>Office Address</h3>
                <p>
                  M Square Lighting – Rest Assured<br />
                  Bengaluru, Karnataka, India
                </p>
              </div>

              <div className="info-item">
                <h3>Business Hours</h3>
                <p>
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 9:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>

              <div className="info-item">
                <h3>Services Areas</h3>
                <p>
                  Bengaluru and surrounding areas<br />
                  Pan-India projects welcome
                </p>
              </div>

              <div className="info-item">
                <h3>What to Expect</h3>
                <ul>
                  <li>Free initial consultation</li>
                  <li>Custom lighting design</li>
                  <li>Professional installation</li>
                  <li>Ongoing support and maintenance</li>
                </ul>
              </div>
            </div>

            <div className="consultation-cta">
              <h3>Schedule a Free Consultation</h3>
              <p>Let's discuss your lighting project in detail and provide you with a customized solution.</p>
              <button className="btn btn-secondary">Book Consultation</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
