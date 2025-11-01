const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  // Check if email configuration is available
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('Email configuration not set. Emails will be logged to console.');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Send contact form email
const sendContactEmail = async ({ name, email, phone, projectType, message }) => {
  const transporter = createTransporter();

  // If no transporter, log to console (development mode)
  if (!transporter) {
    console.log('=== CONTACT FORM SUBMISSION ===');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Project Type:', projectType);
    console.log('Message:', message);
    console.log('==============================');
    return;
  }

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
};

module.exports = {
  sendContactEmail,
};
