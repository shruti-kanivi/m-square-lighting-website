const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../services/emailService');
const { validateContactForm } = require('../middleware/validation');

// Contact form submission endpoint
router.post('/contact', validateContactForm, async (req, res) => {
  try {
    const { name, email, phone, projectType, message } = req.body;

    // Send email notification
    await sendContactEmail({
      name,
      email,
      phone,
      projectType,
      message
    });

    res.status(200).json({
      success: true,
      message: 'Thank you for your inquiry! We will get back to you soon.'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send your message. Please try again later.'
    });
  }
});

// Newsletter subscription endpoint
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    // TODO: Add to newsletter database/service
    console.log('Newsletter subscription:', email);

    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to our newsletter!'
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    });
  }
});

module.exports = router;
