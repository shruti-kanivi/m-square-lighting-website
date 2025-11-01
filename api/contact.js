// Vercel serverless function for contact form
const nodemailer = require('nodemailer');

// Email service function
async function sendContactEmail({ name, email, phone, projectType, message }) {
  // Check if email configuration is available
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('Email configuration not set. Emails will be logged to console.');
    console.log('=== CONTACT FORM SUBMISSION ===');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Project Type:', projectType);
    console.log('Message:', message);
    console.log('==============================');
    return;
  }

  const transporter = nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Email to company
  const companyMailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Submission - ${projectType}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Project Type:</strong> ${projectType}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: white; padding: 15px; border-left: 3px solid #4CAF50;">
            ${message}
          </p>
        </div>
        <p style="color: #666; font-size: 12px;">
          This email was sent from the M Square Lighting website contact form.
        </p>
      </div>
    `,
  };

  // Confirmation email to customer
  const customerMailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Thank You for Contacting M Square Lighting',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
          Thank You for Your Inquiry
        </h2>
        <p>Dear ${name},</p>
        <p>
          Thank you for reaching out to M Square Lighting. We have received your inquiry 
          regarding <strong>${projectType}</strong> and will get back to you within 24-48 hours.
        </p>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #4CAF50; margin-top: 0;">Your Inquiry Details:</h3>
          <p><strong>Project Type:</strong> ${projectType}</p>
          <p><strong>Your Message:</strong></p>
          <p style="background-color: white; padding: 15px; border-left: 3px solid #4CAF50;">
            ${message}
          </p>
        </div>
        <p>
          In the meantime, feel free to explore our 
          <a href="${process.env.CLIENT_URL}/portfolio" style="color: #4CAF50;">portfolio</a> 
          and learn more about our 
          <a href="${process.env.CLIENT_URL}/services" style="color: #4CAF50;">services</a>.
        </p>
        <p>Best regards,<br><strong>M Square Lighting Team</strong></p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          M Square Lighting – Rest Assured<br>
          Bengaluru, Karnataka, India
        </p>
      </div>
    `,
  };

  // Send both emails
  await transporter.sendMail(companyMailOptions);
  await transporter.sendMail(customerMailOptions);
}

// Validation function
function validateContactForm(body) {
  const { name, email, projectType, message } = body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }

  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.push('Valid email is required');
  }

  if (!projectType) {
    errors.push('Project type is required');
  }

  if (!message || message.trim().length < 10) {
    errors.push('Message is required and must be at least 10 characters');
  }

  return errors;
}

// Rate limiting (simple in-memory for serverless)
const requestCounts = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5;

  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  const record = requestCounts.get(ip);
  
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    // Rate limiting
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.'
      });
    }

    // Validate input
    const validationErrors = validateContactForm(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    const { name, email, phone, projectType, message } = req.body;

    // Send email
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
}
